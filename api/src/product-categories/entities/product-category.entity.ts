import { MediaEntity } from 'src/common/entities/media.entity';

export class ProductCategoryEntity {
	id: number;
	name: string;
	description: string | null;
	created_at: Date;
	created_by: number | null;
	updated_at: Date;
	updated_by: number | null;
	deleted_at?: Date | null;
	deleted_by?: number | null;
	media?: MediaEntity | null;

	constructor(
		partial: ProductCategoryEntity,
		media: MediaEntity | null = null,
	) {
		Object.assign(this, {
			...partial,
			media,
		});
	}
}
