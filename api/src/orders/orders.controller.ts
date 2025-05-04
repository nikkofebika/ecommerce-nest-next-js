import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { User } from 'src/common/decorators/params/user/user.decorator';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';
import { IndexDto } from './dto/index.dto';
import { IsReturnPagination } from 'src/common/decorators/reflectors/is-return-paginator.decorator';

@Controller('orders')
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}

	@Post()
	create(@Body() createOrderDto: CreateOrderDto, @User('id') userId: number) {
		return this.ordersService.create(createOrderDto, userId);
	}

	@IsReturnPagination()
	@Get()
	findAll(@Query() indexDto: IndexDto) {
		return this.ordersService.findAll(indexDto);
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.ordersService.findOne(id);
	}

	@Patch(':id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateOrderDto: UpdateOrderDto,
		@User('id') userId: number,
	) {
		return this.ordersService.update(id, updateOrderDto, userId);
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number, @User('id') userId: number) {
		return this.ordersService.remove(id, userId);
	}

	@Delete(':id/force-delete')
	forceDelete(@Param('id', ParseIntPipe) id: number) {
		return this.ordersService.forceDelete(id);
	}

	@Patch(':id/restore')
	restore(@Param('id', ParseIntPipe) id: number) {
		return this.ordersService.restore(id);
	}
}
