import { IntersectionType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

export class PartialIndexDto {
	@IsOptional()
	@IsString()
	name?: string;
}

export class IndexDto extends IntersectionType(
	PaginationQueryDto,
	PartialIndexDto,
) {}
