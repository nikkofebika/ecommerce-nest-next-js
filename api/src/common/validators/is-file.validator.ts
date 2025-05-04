// src/common/validators/is-file.validator.ts
import { Injectable } from '@nestjs/common';
import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';

// export function IsFile(validationOptions?: ValidationOptions) {
// 	return function (object: object, propertyName: string) {
// 		registerDecorator({
// 			name: 'isFile',
// 			target: object.constructor,
// 			propertyName: propertyName,
// 			constraints: [],
// 			options: validationOptions,
// 			validator: {
// 				validate(value: any, args: ValidationArguments) {
// 					console.log('value', value);
// 					return value instanceof Object && 'mimetype' in value;
// 				},
// 				defaultMessage(args: ValidationArguments) {
// 					return `${args.property} must be a valid file`;
// 				},
// 			},
// 		});
// 	};
// }

@Injectable()
@ValidatorConstraint({ name: 'IsFile', async: true })
export class IsFileValidator implements ValidatorConstraintInterface {
	validate(value: any, validationArguments: ValidationArguments): boolean {
		console.log('value', value);
		return value instanceof Object && 'mimetype' in value;
	}

	defaultMessage?(validationArguments: ValidationArguments): string {
		return `${validationArguments.property} must be a valid file`;
	}
}

export function IsFile(ValidationOptions?: ValidationOptions) {
	return function (object: object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: ValidationOptions,
			constraints: [],
			validator: IsFileValidator,
		});
	};
}
