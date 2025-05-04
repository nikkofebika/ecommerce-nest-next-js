import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { TPagination } from 'src/@types/common';
import { MediaEntity } from 'src/common/entities/media.entity';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { IndexDto } from './dto/index.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductsService {
	constructor(private readonly prismaService: PrismaService) {}
	async create(
		createProductDto: CreateProductDto,
		file: Express.Multer.File,
		userId: number,
	): Promise<ProductEntity> {
		return await this.prismaService.$transaction(async (tx) => {
			const product = await tx.product.create({
				data: { ...createProductDto, created_by: userId },
			});
			const productEntity = new ProductEntity(product);

			const media = await tx.media.create({
				data: {
					media_type: 'product',
					media_id: product.id,
					file_name: file.filename,
					mime_type: file.mimetype,
					path: file.path,
					size: file.size,
				},
			});
			const mediaEntity = new MediaEntity(media);

			return new ProductEntity(productEntity, mediaEntity);
		});
	}

	async findAll(indexDto: IndexDto): Promise<TPagination<ProductEntity>> {
		const { page, per_page, sort: _sort, ...filters } = indexDto;

		let where: Prisma.ProductWhereInput = {};
		if (Object.keys(filters).length) {
			Object.entries(filters).forEach(([column, value]) => {
				where = {
					[column]: { contains: value },
				};
			});
		}

		where = {
			AND: {
				deleted_at: null,
			},
		};

		const skip = (page - 1) * per_page;

		const products = await this.prismaService.product.findMany({
			where,
			include: {
				productCategory: {
					select: { id: true, name: true },
				},
			},
			skip,
			take: per_page,
		});

		const medias = await this.prismaService.media.findMany({
			where: {
				media_id: {
					in: products.map((product) => product.id),
				},
				media_type: 'product',
			},
		});

		const data = products.map((product) => {
			const file = medias.find((media) => media.media_id === product.id);
			return new ProductEntity(
				product,
				file ? new MediaEntity(file) : null,
			);
		});

		const total = await this.prismaService.product.count({ where });

		return {
			data,
			meta: {
				current_page: page,
				from: skip + 1,
				per_page: per_page,
				to: page * per_page,
				total: total,
				total_pages: Math.ceil(total / per_page),
			},
		};
	}

	async findOne(id: number): Promise<ProductEntity> {
		const product = await this.prismaService.product.findFirstOrThrow({
			where: {
				id,
			},
			include: {
				productCategory: {
					select: { id: true, name: true },
				},
			},
		});

		const media = await this.prismaService.media.findFirst({
			where: {
				media_id: id,
				media_type: 'product',
			},
		});

		return new ProductEntity(
			product,
			media ? new MediaEntity(media) : null,
		);
	}

	async update(
		id: number,
		userId: number,
		updateProductDto: UpdateProductDto,
		file?: Express.Multer.File,
	): Promise<ProductEntity> {
		return await this.prismaService.$transaction(async (tx) => {
			const product = await tx.product.update({
				where: { id },
				data: { ...updateProductDto, updated_by: userId },
			});

			let mediaEntity: MediaEntity | null = null;
			if (file) {
				await tx.media.deleteMany({
					where: {
						media_id: id,
						media_type: 'product',
					},
				});

				const media = await tx.media.create({
					data: {
						media_id: id,
						media_type: 'product',
						file_name: file.filename,
						path: file.path,
						size: file.size,
						mime_type: file.mimetype,
					},
				});

				mediaEntity = new MediaEntity(media);
			} else {
				const media = await tx.media.findFirst({
					where: {
						media_id: id,
						media_type: 'product',
					},
				});

				mediaEntity = media ? new MediaEntity(media) : null;
			}

			return new ProductEntity(product, mediaEntity);
		});
	}

	async remove(id: number, userId: number): Promise<Product> {
		const product = await this.prismaService.product.findFirstOrThrow({
			where: { id },
		});

		product.deleted_at = new Date();
		product.deleted_by = userId;

		return await this.prismaService.product.update({
			where: { id },
			data: product,
		});
	}

	async forceDelete(id: number): Promise<Product> {
		return await this.prismaService.$transaction(async (tx) => {
			const product = await this.prismaService.product.delete({
				where: { id },
			});

			await tx.media.deleteMany({
				where: {
					media_id: id,
					media_type: 'product',
				},
			});

			return product;
		});
	}

	async restore(id: number): Promise<Product> {
		return await this.prismaService.product.update({
			where: { id },
			data: {
				deleted_at: null,
				deleted_by: null,
			},
		});
	}
}
