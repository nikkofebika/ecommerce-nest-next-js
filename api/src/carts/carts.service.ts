import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { Prisma } from '@prisma/client';

type TItemCart = {
	product_id: number;
	qty: number;
};

@Injectable()
export class CartsService {
	constructor(private readonly prismaService: PrismaService) {}

	async calculateTotalPrice(items: TItemCart[]): Promise<number> {
		const products = await this.prismaService.product.findMany({
			where: {
				id: {
					in: items.map((item) => item.product_id),
				},
			},
		});

		return items.reduce((total, item) => {
			const price =
				products.find((p) => p.id === item.product_id)?.price ?? 0;

			return Number(price) * item.qty;
		}, 0);
	}

	async create(userId: number, createCartDto: CreateCartDto): Promise<any> {
		const existingCart = await this.prismaService.cart.findUnique({
			where: { user_id: userId },
		});

		if (!existingCart) {
			return await this.prismaService.cart.create({
				data: {
					user_id: userId,
					total_price: await this.calculateTotalPrice([
						createCartDto,
					]),
					items: JSON.parse(
						JSON.stringify([createCartDto]),
					) as Prisma.JsonArray,
				},
			});
		}

		const items = existingCart.items as TItemCart[];

		items.push({ ...createCartDto });

		return await this.prismaService.cart.update({
			where: { user_id: userId },
			data: {
				total_price: await this.calculateTotalPrice(items),
				items,
			},
		});
	}

	async findOne(userId: number): Promise<any> {
		const data = await this.prismaService.cart.findUnique({
			where: { user_id: userId },
		});

		return data;
	}

	// async update(userId: number, updateCartDto: UpdateCartDto) {
	// 	return `This action updates a #${id} cart`;
	// }

	async remove(userId: number, productId: number) {
		const cart = await this.prismaService.cart.findUnique({
			where: { user_id: userId },
		});

		if (!cart) {
			throw new NotFoundException('Cart not found');
		}

		const items = (cart.items as TItemCart[]).filter(
			(item) => item.product_id !== productId,
		);

		return await this.prismaService.cart.update({
			where: { user_id: userId },
			data: {
				total_price: await this.calculateTotalPrice(items),
				items: items,
			},
		});
	}
}
