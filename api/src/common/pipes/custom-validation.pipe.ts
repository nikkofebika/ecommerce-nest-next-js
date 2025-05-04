import {
	Injectable,
	PipeTransform,
	UnprocessableEntityException,
	ValidationError,
	ValidationPipe,
} from '@nestjs/common';

@Injectable()
export class CustomValidationPipe
	extends ValidationPipe
	implements PipeTransform
{
	constructor() {
		super({
			whitelist: true,
			transform: true,
			exceptionFactory: (errors: ValidationError[]) => {
				const flatErrors =
					CustomValidationPipe.flattenValidationErrors(errors);
				throw new UnprocessableEntityException(flatErrors);
			},
		});
	}

	private static flattenValidationErrors(
		errors: ValidationError[],
		parentPath = '',
	): { field: string; errors: string[] }[] {
		const result: { field: string; errors: string[] }[] = [];

		for (const error of errors) {
			const path = parentPath
				? `${parentPath}.${error.property}`
				: error.property;

			if (error.constraints) {
				result.push({
					field: path,
					errors: Object.values(error.constraints),
				});
			}

			if (error.children && error.children.length > 0) {
				result.push(
					...this.flattenValidationErrors(error.children, path),
				);
			}
		}

		return result;
	}
}
