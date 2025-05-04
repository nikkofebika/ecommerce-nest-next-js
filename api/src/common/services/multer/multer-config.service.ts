import { Injectable } from '@nestjs/common';
import {
	MulterModuleOptions,
	MulterOptionsFactory,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
	createMulterOptions(): Promise<MulterModuleOptions> | MulterModuleOptions {
		return {
			storage: diskStorage({
				destination: './public/uploads',
				filename(req, file, callback) {
					const uniqueSuffix =
						Date.now() + '-' + Math.round(Math.random() * 1e9);
					callback(null, uniqueSuffix + '-' + file.originalname);
				},
			}),
			limits: {
				fileSize: 1024 * 1024 * 20,
			},
		};
	}
}
