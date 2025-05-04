/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';
import { IsReturnPagination } from '../decorators/reflectors/is-return-paginator.decorator';

@Injectable()
export class CommonResponseInterceptor implements NestInterceptor {
	constructor(private readonly reflector: Reflector) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const isReturnPagination = this.reflector.get(
			IsReturnPagination,
			context.getHandler(),
		);
		if (isReturnPagination) return next.handle();

		return next.handle().pipe(map((data) => ({ data })));
	}
}
