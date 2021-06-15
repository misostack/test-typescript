/* eslint-disable @typescript-eslint/no-empty-interface */
// example for validators

import {
  IsString,
  Length,
  validateOrReject,
  ValidatorOptions,
  IsNotEmpty,
  IsIn,
  ValidationError
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
// interface ValidationError {
//   field: string;
//   message: string;
// }

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
  prefix = 'common'
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
  options: ValidatorOptions = DefaultValidationOptions
): Promise<DTOValidates> => {
  try {
    await validateOrReject(values, options);
    return { errors: [], valid: true };
  } catch (err: any) {
    if (Array.isArray(err)) {
      return { errors: marshalValidationErrors(err), valid: false };
    }
    // else throw server error
    throw new Error(err);
  }
};
