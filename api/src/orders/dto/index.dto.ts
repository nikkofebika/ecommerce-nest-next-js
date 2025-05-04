import { IntersectionType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

class PartialIndexDto {
	@IsOptional()
	@IsString()
	invoice_number?: string;
}

export class IndexDto extends IntersectionType(
	PaginationQueryDto,
	PartialIndexDto,
) {}
