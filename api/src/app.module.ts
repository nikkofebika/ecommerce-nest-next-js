import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { ProductCategoriesModule } from './product-categories/product-categories.module';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { CartsModule } from './carts/carts.module';

@Module({
	imports: [
		ServeStaticModule.forRoot({
			serveRoot: '/public',
			rootPath: join(__dirname, '..', 'public'),
		}),
		CommonModule,
		AuthModule,
		UsersModule,
		ProductCategoriesModule,
		ProductsModule,
		OrdersModule,
		OrderDetailsModule,
		CartsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
