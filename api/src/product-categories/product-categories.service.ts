import { Injectable } from '@nestjs/common';
import { Prisma, ProductCategory } from '@prisma/client';
import { TPagination } from 'src/@types/common';
import { MediaEntity } from 'src/common/entities/media.entity';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { IndexDto } from './dto/index.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { ProductCategoryEntity } from './entities/product-category.entity';

@Injectable()
export class ProductCategoriesService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(
		createProductCategoryDto: CreateProductCategoryDto,
		file: Express.Multer.File,
		userId: number,
	): Promise<ProductCategoryEntity> {
		return await this.prismaService.$transaction(async (tx) => {
			const productCategory = await tx.productCategory.create({
				data: {
					...createProductCategoryDto,
					created_by: userId,
				},
			});

			const media = await tx.media.create({
				data: {
					media_id: productCategory.id,
					media_type: 'productCategory',
					file_name: file.filename,
					path: file.path,
					size: file.size,
					mime_type: file.mimetype,
				},
			});

			return new ProductCategoryEntity(
				productCategory,
				new MediaEntity(media),
			);
		});
	}

	async findAll(
		indexDto: IndexDto,
	): Promise<TPagination<ProductCategoryEntity>> {
		const { page, per_page, sort: _sort, ...filters } = indexDto;

		let where: Prisma.ProductCategoryWhereInput = {};
		if (Object.keys(filters).length) {
			Object.entries(filters).forEach(([column, value]) => {
				where = {
					...where,
					[column]: { contains: value },
				};
			});
		}

		where = {
			...where,
			AND: {
				deleted_at: null,
			},
		};

		const skip = (page - 1) * per_page;

		const productCategories =
			await this.prismaService.productCategory.findMany({
				where,
				skip,
				take: per_page,
			});

		const medias = await this.prismaService.media.findMany({
			where: {
				media_id: {
					in: productCategories.map((product) => product.id),
				},
				media_type: 'productCategory',
			},
		});

		const data = productCategories.map((product) => {
			const file = medias.find((media) => media.media_id === product.id);
			return new ProductCategoryEntity(
				product,
				file ? new MediaEntity(file) : null,
			);
		});

		const total = await this.prismaService.productCategory.count({ where });

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

	async findOne(
		id: number,
		additionalWhere?: Prisma.ProductCategoryWhereInput,
	): Promise<ProductCategoryEntity> {
		const productCategory =
			await this.prismaService.productCategory.findFirstOrThrow({
				where: {
					id,
					AND: additionalWhere,
				},
			});

		const media = await this.prismaService.media.findFirst({
			where: {
				media_id: productCategory.id,
				media_type: 'productCategory',
			},
		});

		const mediaEntity = media ? new MediaEntity(media) : null;

		return new ProductCategoryEntity(productCategory, mediaEntity);
	}

	async update(
		id: number,
		userId: number,
		updateProductCategoryDto: UpdateProductCategoryDto,
		file?: Express.Multer.File,
	): Promise<ProductCategoryEntity> {
		return await this.prismaService.$transaction(async (tx) => {
			const productCategory = await tx.productCategory.update({
				where: { id },
				data: { ...updateProductCategoryDto, updated_by: userId },
			});

			let mediaEntity: MediaEntity | null = null;
			if (file) {
				await tx.media.deleteMany({
					where: {
						media_id: id,
						media_type: 'productCategory',
					},
				});

				const media = await tx.media.create({
					data: {
						media_id: id,
						media_type: 'productCategory',
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
						media_type: 'productCategory',
					},
				});

				mediaEntity = media ? new MediaEntity(media) : null;
			}

			return new ProductCategoryEntity(productCategory, mediaEntity);
		});
	}

	async remove(id: number, userId: number): Promise<ProductCategory> {
		const productCategory =
			await this.prismaService.productCategory.findUniqueOrThrow({
				where: { id },
			});

		productCategory.deleted_at = new Date();
		productCategory.deleted_by = userId;

		return await this.prismaService.productCategory.update({
			where: { id },
			data: productCategory,
		});
	}

	async forceDelete(id: number): Promise<ProductCategory> {
		return this.prismaService.$transaction(async (tx) => {
			const productCategory = await tx.productCategory.delete({
				where: { id },
			});

			await tx.media.deleteMany({
				where: {
					media_id: id,
					media_type: 'productCategory',
				},
			});

			return productCategory;
		});
	}

	async restore(id: number): Promise<ProductCategory> {
		return await this.prismaService.productCategory.update({
			where: { id },
			data: {
				deleted_at: null,
				deleted_by: null,
			},
		});
	}
}
