import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/common/services/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { IndexDto } from './dto/index.dto';
import { TPagination } from 'src/@types/common';
import { UserEntity } from './entities/user.entity';
import { BaseService } from 'src/common/services/base.service';

@Injectable()
export class UsersService extends BaseService {
	constructor(private readonly prismaService: PrismaService) {
		super();
	}

	async create(createUserDto: CreateUserDto): Promise<any> {
		const data = {
			...createUserDto,
		};

		data.password = await bcrypt.hash(createUserDto.password, 10);

		// const newData = this.withMeta(data, 1, true);

		console.log('data', data);
		// console.log('newData', newData);

		return data;

		const user = await this.prismaService.user.create({
			data: data,
		});

		return user;
	}

	async findAll(indexDto: IndexDto): Promise<TPagination<User>> {
		const { page, per_page, sort, ...filters } = indexDto;

		let where: Prisma.UserWhereInput = {};
		if (Object.keys(filters).length) {
			Object.entries(filters).forEach(([column, value]) => {
				where = {
					...where,
					[column]: { contains: value },
				};
			});
		}

		where = {
			...where,
			AND: {
				deleted_at: null,
			},
		};

		const skip = (page - 1) * per_page;
		let users = await this.prismaService.user.findMany({
			where,
			skip,
			take: per_page,
		});
		users = users.map((user) => new UserEntity(user));

		const total = await this.prismaService.user.count({ where });

		return {
			data: users,
			meta: {
				current_page: page,
				from: skip + 1,
				per_page: per_page,
				to: page * per_page,
				total: total,
				total_pages: Math.ceil(total / per_page),
			},
		};
	}

	async findOne(
		id: number,
		additionalWhere?: Prisma.UserWhereInput,
	): Promise<User> {
		const user = await this.prismaService.user.findFirstOrThrow({
			where: {
				id,
				AND: additionalWhere,
			},
		});

		return new UserEntity(user);
	}

	async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
		const user = await this.findOne(id);

		if (updateUserDto.password) {
			user.password = await bcrypt.hash(updateUserDto.password, 10);
		}

		return await this.prismaService.user.update({
			where: { id },
			data: user,
		});
	}

	async remove(id: number): Promise<User> {
		const user = await this.findOne(id);

		user.deleted_at = new Date();
		user.deleted_by = 1;

		return await this.prismaService.user.update({
			where: { id },
			data: user,
		});
	}

	async forceDelete(id: number): Promise<User> {
		return await this.prismaService.user.delete({
			where: { id },
		});
	}

	async restore(id: number): Promise<User> {
		return await this.prismaService.user.update({
			where: { id },
			data: {
				deleted_at: null,
				deleted_by: null,
			},
		});
	}
}
