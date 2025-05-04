import { Type } from 'class-transformer';
import {
	IsArray,
	IsInt,
	IsOptional,
	IsString,
	Min,
	ValidateNested,
} from 'class-validator';
import { Exist } from 'src/common/validators/exist.validator';

export class CreateOrderDto {
	@IsOptional()
	@IsString()
	description: string;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => OrderItemDto)
	items: OrderItemDto[];
}

class OrderItemDto {
	@Type(() => Number)
	@IsInt()
	@Exist({ model: 'product', column: 'id' })
	product_id: number;

	@Type(() => Number)
	@IsInt()
	@Min(1)
	qty: number;
}
