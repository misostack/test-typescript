/* eslint-disable @typescript-eslint/no-empty-interface */
// example for validators

import { IsString, Length, validate, ValidatorOptions } from 'class-validator';

//props: name, parentId
interface DTO {}
interface DTOValidates {
  values: DTO;
  errors: any;
}

class CategoryDTO implements DTO {
  @Length(3, 60)
  name?: string;

  @IsString()
  tags?: string;
}

export class CreateCategoryDTO extends CategoryDTO {}

export const DefaultValidationOptions: ValidatorOptions = {
  skipMissingProperties: false,
  whitelist: false,
  stopAtFirstError: false
};

export const validateDTO = async (
  input: DTO,
  options: ValidatorOptions = DefaultValidationOptions
): Promise<DTOValidates> => {
  try {
    const values = await validate(input, options);
    return { values, errors: null };
  } catch (errors) {
    return { values: input, errors };
  }
};
