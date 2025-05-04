import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { CommonResponseInterceptor } from './common-response/common-response.interceptor';
import { CustomValidationPipe } from './pipes/custom-validation.pipe';
import { PrismaService } from './services/prisma/prisma.service';
import { ExistValidator } from './validators/exist.validator';
import { UniqueValidator } from './validators/unique.validator';
import { AuthGuard } from './guards/auth/auth.guard';

@Global()
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
		}),
	],
	providers: [
		PrismaService,
		ExistValidator,
		UniqueValidator,
		{
			provide: APP_PIPE,
			useClass: CustomValidationPipe,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: CommonResponseInterceptor,
		},
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
	],
	exports: [PrismaService],
})
export class CommonModule {}
