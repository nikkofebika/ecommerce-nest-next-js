import { ProductCategory } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { MediaEntity } from 'src/common/entities/media.entity';

export class ProductEntity {
	id: number;
	product_category_id: number;
	name: string;
	price: number;
	description: string;
	created_at: Date;
	created_by: number | null;
	updated_at: Date;
	updated_by: number | null;
	deleted_at: Date;
	deleted_by: number | null;
	productCategory: ProductCategory;

	constructor(partial: any, media: MediaEntity | null = null) {
		Object.assign(this, {
			...partial,
			price:
				partial.price instanceof Decimal
					? partial.price.toNumber()
					: partial.price,
			file: media,
		});
	}
}
