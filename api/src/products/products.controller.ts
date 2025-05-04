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
import { CreateProductDto } from './dto/create-product.dto';
import { IndexDto } from './dto/index.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@UseInterceptors(FileInterceptor('file'))
	@Post()
	async create(
		@Body() createProductDto: CreateProductDto,
		@UploadedFile(new ValidateFilePipe()) file: Express.Multer.File,
		@User('id') userId: number,
	) {
		try {
			return this.productsService.create(createProductDto, file, userId);
		} catch (error) {
			await fs.unlink(file.path);
			throw error;
		}
	}

	@IsReturnPagination()
	@Get()
	findAll(@Query() indexDto: IndexDto) {
		return this.productsService.findAll(indexDto);
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.productsService.findOne(id);
	}

	@UseInterceptors(FileInterceptor('file'))
	@Patch(':id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@User('id') userId: number,
		@Body() updateProductDto: UpdateProductDto,
		@UploadedFile(new ValidateFilePipe({ required: false }))
		file?: Express.Multer.File,
	) {
		return this.productsService.update(id, userId, updateProductDto, file);
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number, @User('id') userId: number) {
		return this.productsService.remove(id, userId);
	}

	@Delete(':id/force-delete')
	forceDelete(@Param('id', ParseIntPipe) id: number) {
		return this.productsService.forceDelete(id);
	}

	@Patch(':id/restore')
	restore(@Param('id', ParseIntPipe) id: number) {
		return this.productsService.restore(id);
	}
}
