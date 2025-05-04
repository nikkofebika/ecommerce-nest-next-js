import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
} from '@nestjs/common';
import { User } from 'src/common/decorators/params/user/user.decorator';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';

@Controller('carts')
export class CartsController {
	constructor(private readonly cartsService: CartsService) {}

	@Post()
	create(@Body() createCartDto: CreateCartDto, @User('id') userId: number) {
		return this.cartsService.create(userId, createCartDto);
	}

	@Get()
	findOne(@User('id') userId: number) {
		return this.cartsService.findOne(userId);
	}

	// @Patch()
	// update(@Body() updateCartDto: UpdateCartDto, @User('id') userId: number) {
	// 	return this.cartsService.update(userId, updateCartDto);
	// }

	@Delete(':id')
	remove(
		@Param('id', ParseIntPipe) productId: number,
		@User('id') userId: number,
	) {
		return this.cartsService.remove(userId, productId);
	}
}
