/* eslint-disable @typescript-eslint/no-empty-interface */
// example for validators

import {
  IsString,
  Length,
  validateOrReject,
  ValidatorOptions,
  IsNotEmpty,
  IsIn,
  ValidationError,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  Validate
} from 'class-validator';

//props: name, parentId
interface DTO {}
interface DTOValidateError {
  code: string;
  field: string;
  message: string;
}
interface DTOValidates {
  errors: DTOValidateError[];
  valid: boolean;
}

// custom validator
@ValidatorConstraint()
export class PasswordStrength implements ValidatorConstraintInterface {
  validate(value: string) {
    const regex = new RegExp(
      /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/
    );
    return regex.test(value);
  }
}

class CategoryDTO implements DTO {
  @IsNotEmpty({})
  @Length(3, 60)
  name?: string;

  @IsString({
    each: true
  })
  tags?: string[];

  @IsNotEmpty({})
  description?: string;

  @IsNotEmpty({})
  @IsIn(['active', 'inactive'])
  status?: string;

  @Validate(PasswordStrength, {
    message:
      '$property should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long'
  })
  password?: string;
}

export class CreateCategoryDTO extends CategoryDTO {}

export const DefaultValidationOptions: ValidatorOptions = {
  skipMissingProperties: false,
  whitelist: false,
  stopAtFirstError: false,
  validationError: {
    target: false
  }
};

const marshalValidationErrors = (
  errors: ValidationError[],
  prefix: string
): { code: string; field: string; message: string }[] => {
  return errors.map((e) => {
    const { property, constraints } = e;
    // pick the first error
    const errorCode = constraints
      ? Object.keys(constraints)[0].toLowerCase()
      : 'unknown';
    return {
      code: `e_${prefix}_${property}_${errorCode}`,
      field: property,
      message: constraints
        ? constraints[Object.keys(constraints)[0]]
        : 'unknown error'
    };
  });
};

export const validateDTO = async (
  values: DTO,
  errorPrefix = '',
  options: ValidatorOptions = DefaultValidationOptions
): Promise<DTOValidates> => {
  try {
    await validateOrReject(values, options);
    return { errors: [], valid: true };
  } catch (err: any) {
    if (Array.isArray(err)) {
      return {
        errors: marshalValidationErrors(
          err,
          errorPrefix ? errorPrefix : 'common'
        ),
        valid: false
      };
    }
    // else throw server error
    throw new Error(err);
  }
};
