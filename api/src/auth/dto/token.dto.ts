import { IsEmail, IsString } from 'class-validator';

export class TokenDto {
	@IsEmail()
	email: string;

	@IsString()
	password: string;
}
