import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';
import { Exist } from 'src/common/validators/exist.validator';

export class CreateCartDto {
	@Type(() => Number)
	@IsInt()
	@Exist({ model: 'product', column: 'id' })
	product_id: number;

	@Type(() => Number)
	@IsInt()
	@Min(1)
	qty: number;
}
