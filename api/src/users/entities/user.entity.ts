import { UserType } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity {
	id: number;
	// role_id: number;
	name: string;
	email: string;
	// email_verified_at: Date;
	type: UserType;
	created_at: Date;
	created_by: number | null;
	updated_at: Date;
	updated_by: number | null;
	deleted_at: Date | null;
	deleted_by: number | null;

	@Exclude()
	password: string;

	constructor(partial: Partial<UserEntity>) {
		Object.assign(this, partial);
	}
}
