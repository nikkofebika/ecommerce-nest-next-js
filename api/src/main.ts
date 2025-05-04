import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import * as methodOverride from 'method-override';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.use(methodOverride('_method'));
	app.enableCors({
		origin: true,
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		credentials: true,
		allowedHeaders: 'Content-Type, Accept, Authorization',
	});

	useContainer(app.select(AppModule), { fallbackOnErrors: true });

	await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
