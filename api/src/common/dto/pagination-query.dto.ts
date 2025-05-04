import { Type } from 'class-transformer';
import { IsNumber, IsPositive, IsString } from 'class-validator';

export class PaginationQueryDto {
	@Type(() => Number)
	@IsNumber()
	@IsPositive()
	page: number = 1;

	@Type(() => Number)
	@IsNumber()
	@IsPositive()
	per_page: number = 20;

	@IsString()
	sort: string = 'desc';
}
