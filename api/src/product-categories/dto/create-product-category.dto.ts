import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateProductCategoryDto {
	@IsString()
	@MinLength(3)
	name: string;

	@IsOptional()
	@IsString()
	@MinLength(3)
	description: string;

	// @IsFile()
	// file: Buffer;
}
