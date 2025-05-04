import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Exist } from 'src/common/validators/exist.validator';

export class CreateProductDto {
	@Type(() => Number)
	@IsNumber()
	@Exist({ model: 'productCategory', column: 'id' })
	product_category_id: number;

	@IsString()
	name: string;

	@Type(() => Number)
	@Min(0)
	price: number;

	@IsOptional()
	@IsString()
	description?: string;
}
