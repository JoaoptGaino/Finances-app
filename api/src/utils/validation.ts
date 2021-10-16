import { BadRequestException, ValidationError } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
export function exceptionFactory(errors: ValidationError[]) {
  const notPermited = errors
    .filter(
      (error) =>
        error.constraints?.unknownValue ||
        error.constraints?.whitelistValidation,
    )
    .map((error) => `'${error.property}'`);

  if (notPermited.length) {
    return new BadRequestException(
      `Há valores não esperados no formulário (${notPermited.join(', ')})`,
    );
  }

  const message = errors.map(
    (error) => `O valor de '${error.property}' (${error.value}) está incorreto`,
  );

  return new BadRequestException(message);
}

export function getArrayFromPrismaEnum(e: any) {
  return Object.keys(e).filter((k) => typeof e[k as any] !== 'number');
}

export function IsCEP() {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCEP',
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate(value: any) {
          return typeof value === 'string' && /^\d{5}-\d{3}$/.test(value);
        },
      },
    });
  };
}

export function IsCPF() {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCPF',
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate(value: any) {
          return (
            typeof value === 'string' &&
            /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(value)
          );
        },
      },
    });
  };
}

export function IsRG() {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isRG',
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate(value: any) {
          return (
            typeof value === 'string' &&
            /d{1,2}).?(\d{3}).?(\d{3})-?(\d{1}|X|x$/.test(value)
          );
        },
      },
    });
  };
}

export function IsCNPJ() {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCNPJ',
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate(value: any) {
          return (
            typeof value === 'string' &&
            /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/.test(value)
          );
        },
      },
    });
  };
}
