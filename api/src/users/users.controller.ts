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
	UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { IndexDto } from './dto/index.dto';
import { IsReturnPagination } from 'src/common/decorators/reflectors/is-return-paginator.decorator';
import { User } from 'src/common/decorators/params/user/user.decorator';
import { UserEntity } from './entities/user.entity';
import { InjectMetaInfoInterceptor } from 'src/common/interceptors/inject-meta-info/inject-meta-info.interceptor';

@UseInterceptors(ClassSerializerInterceptor, InjectMetaInfoInterceptor)
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@Get()
	@IsReturnPagination(true)
	findAll(@Query() indexDto: IndexDto) {
		return this.usersService.findAll(indexDto);
	}

	@Get('me')
	me(@User() user: UserEntity) {
		return user;
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.usersService.findOne(id);
	}

	@Patch(':id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateUserDto: UpdateUserDto,
	) {
		return this.usersService.update(id, updateUserDto);
	}

	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.usersService.remove(id);
	}

	@Delete(':id/force-delete')
	forceDelete(@Param('id', ParseIntPipe) id: number) {
		return this.usersService.forceDelete(id);
	}

	@Patch(':id/restore')
	restore(@Param('id', ParseIntPipe) id: number) {
		return this.usersService.restore(id);
	}
}
