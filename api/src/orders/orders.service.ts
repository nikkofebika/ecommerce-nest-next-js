import { Injectable } from '@nestjs/common';
import { InvoiceSequence, Order, Prisma } from '@prisma/client';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { IndexDto } from './dto/index.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { TPagination } from 'src/@types/common';

@Injectable()
export class OrdersService {
	constructor(private readonly prismaService: PrismaService) {}

	async generateInvoiceNumber() {
		const today = new Date();
		const todayDateOnly = new Date(today.toDateString());
		const datePrefix = today
			.toISOString()
			.split('T')[0]
			.replaceAll('-', '');
		// console.log('today', today);
		// console.log('todayDateOnly', todayDateOnly);
		// console.log('datePrefix', datePrefix);

		return await this.prismaService.$transaction(async (tx) => {
			let invoiceSequence = await tx.$queryRawUnsafe<InvoiceSequence[]>(`
				SELECT * FROM invoice_sequences WHERE id = 1 FOR UPDATE
			  `);

			if (invoiceSequence.length <= 0) {
				invoiceSequence = await tx.$queryRawUnsafe(
					'INSERT INTO invoice_sequences (id, next_number, date, updated_at) VALUES (1,1,?,?)',
					today,
					todayDateOnly,
				);
			}
			// console.log('invoiceSequence', invoiceSequence);

			const nextNumber = Number(invoiceSequence[0]?.next_number ?? 1);
			const lastDate = new Date(invoiceSequence[0]?.date);
			// console.log('nextNumber', nextNumber);

			// console.log('lastDate.toDateString()', lastDate.toDateString());
			// console.log('today.toDateString()', today.toDateString());
			// console.log('today.toDateString()', today.toString());
			const isNewDay = lastDate.toDateString() !== today.toDateString();
			// console.log('isNewDay', isNewDay);
			const newNextNumber = isNewDay ? 1 : nextNumber + 1;
			// console.log('newNextNumber', newNextNumber);

			await tx.$queryRawUnsafe(
				'UPDATE invoice_sequences SET next_number = ?, date = ? WHERE id = 1',
				newNextNumber,
				todayDateOnly,
			);

			return `INV${datePrefix}${nextNumber.toString().padStart(5, '0')}`;
		});
	}

	async prepareData(data: CreateOrderDto, userId: number) {
		const products = await this.prismaService.product.findMany({
			where: {
				id: {
					in: data.items.map((item) => item.product_id),
				},
			},
		});

		const total_price = data.items.reduce((total, item) => {
			const price =
				products.find((p) => p.id === item.product_id)?.price ?? 0;

			return total + Number(price) * item.qty;
		}, 0);

		const orderData: Prisma.OrderCreateInput = {
			description: data.description,
			total_price,
			created_by: userId,
		};

		const orderDetailsData: Prisma.OrderDetailCreateManyOrderInput[] =
			data.items.map((item) => {
				const product = products.find((p) => p.id === item.product_id)!;
				return {
					product_id: item.product_id,
					qty: item.qty,
					price: product.price,
					total_price: Number(product.price) * item.qty,
					created_by: orderData.created_by,
				};
			});

		return {
			orderData,
			orderDetailsData,
		};
	}

	async create(createOrderDto: CreateOrderDto, userId: number) {
		const { orderData, orderDetailsData } = await this.prepareData(
			createOrderDto,
			userId,
		);

		return await this.prismaService.$transaction(async (tx) => {
			const order = await tx.order.create({
				data: {
					...orderData,
					orderDetails: {
						createMany: {
							data: orderDetailsData,
						},
					},
				},
			});

			await tx.order.update({
				where: { id: order.id },
				data: {
					invoice_number: await this.generateInvoiceNumber(),
				},
			});

			return order;
		});
	}

	async findAll(indexDto: IndexDto): Promise<TPagination<Order>> {
		const { page, per_page, sort: _sort, ...filters } = indexDto;

		let where: Prisma.OrderWhereInput = {};
		Object.keys(filters).forEach(([column, value]) => {
			where = {
				[column]: {
					contains: value,
				},
			};
		});

		const skip = (page - 1) * per_page;
		const [data, total] = await Promise.all([
			this.prismaService.order.findMany({
				where,
				skip,
				take: per_page,
			}),
			this.prismaService.order.count({ where }),
		]);

		return {
			data,
			meta: {
				current_page: page,
				from: skip + 1,
				per_page,
				to: page * per_page,
				total,
				total_pages: Math.ceil(total / per_page),
			},
		};
	}

	async findOne(id: number): Promise<Order> {
		return await this.prismaService.order.findFirstOrThrow({
			where: { id },
			include: {
				orderDetails: {
					include: {
						product: true,
					},
				},
			},
		});
	}

	async update(id: number, updateOrderDto: UpdateOrderDto, userId: number) {
		return `This action updates a #${id} order`;
	}

	async remove(id: number, userId: number) {
		return await this.prismaService.order.update({
			where: { id },
			data: {
				deleted_at: new Date(),
				deleted_by: userId,
			},
		});
	}

	async forceDelete(id: number) {
		return await this.prismaService.order.delete({
			where: { id },
		});
	}

	async restore(id: number): Promise<Order> {
		return await this.prismaService.order.update({
			where: { id },
			data: {
				deleted_at: null,
				deleted_by: null,
			},
		});
	}
}
