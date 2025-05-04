import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Query,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs/promises';
import { User } from 'src/common/decorators/params/user/user.decorator';
import { IsReturnPagination } from 'src/common/decorators/reflectors/is-return-paginator.decorator';
import { ValidateFilePipe } from 'src/common/pipes/validate-file.pipe';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { IndexDto } from './dto/index.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { ProductCategoriesService } from './product-categories.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('product-categories')
export class ProductCategoriesController {
	constructor(
		private readonly productCategoriesService: ProductCategoriesService,
	) {}

	@UseInterceptors(FileInterceptor('file'))
	@Post()
	async create(
		@Body() createProductCategoryDto: CreateProductCategoryDto,
		@UploadedFile(
			new ValidateFilePipe({
				required: false,
			}),
		)
		file: Express.Multer.File,
		@User('id') userId: number,
	) {
		try {
			return this.productCategoriesService.create(
				createProductCategoryDto,
				file,
				userId,
			);
		} catch (error) {
			await fs.unlink(file.path);
			throw error;
		}
	}

	@Get()
	@IsReturnPagination(true)
	findAll(@Query() indexDto: IndexDto) {
		return this.productCategoriesService.findAll(indexDto);
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.productCategoriesService.findOne(id);
	}

	@UseInterceptors(FileInterceptor('file'))
	@Patch(':id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@User('id') userId: number,
		@Body() updateProductCategoryDto: UpdateProductCategoryDto,
		@UploadedFile(new ValidateFilePipe({ required: false }))
		file?: Express.Multer.File,
	) {
		return this.productCategoriesService.update(
			id,
			userId,
			updateProductCategoryDto,
			file,
		);
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number, @User('id') userId: number) {
		return this.productCategoriesService.remove(id, userId);
	}

	@Delete(':id/force-delete')
	forceDelete(@Param('id', ParseIntPipe) id: number) {
		return this.productCategoriesService.forceDelete(id);
	}

	@Patch(':id/restore')
	restore(@Param('id', ParseIntPipe) id: number) {
		return this.productCategoriesService.restore(id);
	}
}
