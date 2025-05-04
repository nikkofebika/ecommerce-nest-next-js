import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/common/services/multer/multer-config.service';

@Module({
	imports: [
		MulterModule.registerAsync({
			useClass: MulterConfigService,
		}),
	],
	controllers: [ProductsController],
	providers: [ProductsService],
})
export class ProductsModule {}
