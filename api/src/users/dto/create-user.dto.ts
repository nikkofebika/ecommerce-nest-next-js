import {
	IsEmail,
	IsEnum,
	IsOptional,
	IsString,
	MinLength,
} from 'class-validator';
import { Unique } from 'src/common/validators/unique.validator';
import { UserType } from '../types';

export class CreateUserDto {
	@IsString()
	@MinLength(3)
	name: string;

	@IsString()
	@IsEmail()
	@Unique({ model: 'user', column: 'email' })
	email: string;

	@IsString()
	@MinLength(6)
	password: string;

	@IsString()
	@IsEnum(UserType)
	type: UserType;

	@IsOptional()
	created_at?: Date;

	@IsOptional()
	created_by?: number;

	@IsOptional()
	updated_at?: Date;

	@IsOptional()
	updated_by?: number;

	@IsOptional()
	deleted_at?: Date;

	@IsOptional()
	deleted_by?: number;
}
