import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class InjectMetaInfoInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const request = context.switchToHttp().getRequest<Request>();
		const user = request.user;
		const now = new Date();

		console.log('body', request.body);

		request.body.updated_by = user.id;
		request.body.updated_at = now;

		if (request.method == 'POST') {
			request.body.created_by = user.id;
			request.body.created_at = now;
		}

		if (request.method == 'DELETE') {
			request.body.deleted_by = user.id;
			request.body.deleted_at = now;
		}

		return next.handle().pipe(map((data) => data));
	}
}
