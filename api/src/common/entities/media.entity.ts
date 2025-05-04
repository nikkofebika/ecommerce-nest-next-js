import { Expose } from 'class-transformer';

export class MediaEntity {
	id: number;
	media_id: number;
	media_type: string;
	file_name: string;
	path: string;
	size: number;
	mime_type: string;
	created_at: Date;
	updated_at: Date;

	@Expose()
	get url(): string {
		return `${process.env.APP_URL}/${this.path}`;
	}

	constructor(partial: Partial<MediaEntity>) {
		Object.assign(this, partial);
	}
}
