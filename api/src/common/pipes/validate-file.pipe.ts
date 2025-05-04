import {
	ArgumentMetadata,
	HttpException,
	HttpStatus,
	Injectable,
	PipeTransform,
} from '@nestjs/common';

type TValidateFileOptions = {
	name?: string;
	mimeTypes?: string[];
	required?: boolean;
	maxSize?: number;
};

type TErrorResponse = {
	field: string;
	errors: string[];
};

@Injectable()
export class ValidateFilePipe implements PipeTransform {
	private options: TValidateFileOptions;

	/**
	 * Create a new instance of the ValidateFilePipe.
	 * @param {TValidateFileOptions} [options] - Options for validating the file.
	 * @param {string} [options.name=file] - The name of the file.
	 * @param {string[]} [options.mimeTypes] - The mime types of the file, e.g. ['image/jpeg', 'image/jpg', 'image/png'].
	 * @param {number} [options.maxSize=20971520] - The maximum size of the file, in bytes.
	 * @param {boolean} [options.required=true] - Whether the file is required.
	 */
	constructor(options?: TValidateFileOptions) {
		this.options = {
			name: 'file',
			maxSize: 1024 * 1024 * 20,
			mimeTypes: ['image/jpeg', 'image/jpg', 'image/png'],
			required: false,
			...options,
		};
	}

	transform(
		value: Express.Multer.File | Express.Multer.File[],
		_metadata: ArgumentMetadata,
	) {
		if (!value) {
			if (this.options.required) {
				this.errorResponse({
					field: this.options.name!,
					errors: ['file is required'],
				});
			}

			return value;
		}

		let values = value as Express.Multer.File[];
		const isArray = Array.isArray(values);

		if (!isArray) {
			values = [value] as Express.Multer.File[];
		}

		values.forEach((file) => {
			if (!this.options.mimeTypes?.includes(file.mimetype)) {
				this.errorResponse({
					field: this.options.name!,
					errors: ['Invalid file type'],
				});
			}

			if (file.size > this.options.maxSize!) {
				this.errorResponse({
					field: this.options.name!,
					errors: ['File size is too large'],
				});
			}
		});

		return isArray ? values : value;
	}

	errorResponse(data: TErrorResponse): Error {
		throw new HttpException(
			{ message: [data] },
			HttpStatus.UNPROCESSABLE_ENTITY,
		);
	}
}
