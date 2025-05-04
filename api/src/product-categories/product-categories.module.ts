import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/common/services/multer/multer-config.service';
import { ProductCategoriesController } from './product-categories.controller';
import { ProductCategoriesService } from './product-categories.service';

@Module({
	imports: [
		MulterModule.registerAsync({
			useClass: MulterConfigService,
		}),
	],
	controllers: [ProductCategoriesController],
	providers: [ProductCategoriesService],
})
export class ProductCategoriesModule {}
