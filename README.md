# Typescript Project

## Getting start

```bash
# start dev
yarn start:dev

# build
yarn build

# run
yarn start
```

## Topics

1. :heavy_check_mark: [class-transformer](https://github.com/typestack/class-transformer)
2. :heavy_check_mark: [class-validator](https://github.com/typestack/class-validator)
3. :heavy_check_mark: [typeorm](https://typeorm.io/#/connection-options/sqlite-connection-options)
4. :heavy_check_mark: [moment](https://momentjs.com/docs/)
5. :heavy_check_mark: [dayjs](https://day.js.org/docs/en/parse/utc)
6. :heavy_check_mark: [faker](https://www.npmjs.com/package/faker)

### Class Transformer

```js
import { plainToClass } from 'class-transformer';
import { CreateCategoryDTO, validateDTO } from './libs';
const categoryJSON = { name: '', tags: [] }; // json object
// transform to class
const category = plainToClass(CreateCategoryDTO, categoryJSON);
```

### Class Validator

```md
#### There are few special tokens you can use in your messages:

1. $value - the value that is being validated
2. $property - name of the object's property being validated
3. $target - name of the object's class being validated
4. $constraint1, $constraint2, ... $constraintN - constraints defined by specific validation type
```

```js
export const validateDTO = async (
  values: DTO,
  errorPrefix = '',
  options: ValidatorOptions = DefaultValidationOptions
): Promise<DTOValidates> => {...}
```

```js
(async () => {
  const { errors, valid } = await validateDTO(category, 'category', {});
  debug(true, 'categoryDTO:valid', valid);
  debug(true, 'categoryDTO:errors', errors);
})();


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

@Validate(PasswordStrength, {
  message:
    '$property should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long'
})
password?: string;
```

**Sample Response for errors after validation**

```js
 [
    {
      code: 'e_category_name_islength',
      field: 'name',
      message: 'name must be longer than or equal to 3 characters'
    },
    {
      code: 'e_category_description_isnotempty',
      field: 'description',
      message: 'description should not be empty'
    },
    {
      code: 'e_category_status_isin',
      field: 'status',
      message: 'status must be one of the following values: active, inactive'
    },
    [length]: 3
  ],
```

## Refs

- https://khalilstemmler.com/blogs/typescript/node-starter-project/

## Intro

Chao {name},
Anh ten Son - hom nay anh se phong van em vi tri FE dev
Em co the gioi thieu so qua 1 chut ve ban than, cu the gom
Kinh nghiem lam viec, diem manh, diem yeu.

- Em co the chia se trong nhung du an truoc gio, du an nao khien em tam dac nhat.
- Em co the chia se ve du an gan nhat em da lam.

Cu the: em co the noi sau hon ve cong nghe, nghiep vu, diem gi kho khan nhat trong du an ma em da doi mat va cach.

## Angular Interview questions

1. Trong angular validator c???a form l?? sync hay async
2. Khi n??o validator run : khi user submit hay khi gi?? tr??? change?
3. Co' cach nao optimize hok
4. L??m th??? n??o ????? share d??? li???u gi???a c??c component
5. C??ch qu???n l?? state trong app angular
6. L??m sao ????? truy c???p DOM trong Angular v?? d??ng ????? l??m g??
7. C??ch ????? x??y d???ng 1 ???ng d???ng h??? tr??? multi language trong Angular - gi???i ph??p

```md
components
containers
services
directives
pipes
interceptors
helpers
guards

A => pages
B => pages
C => pages
```

**META Types**

```js
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

const marshalValidationErrors = (errors: any[]) => {
  return errors.map((prop: { property: string | number; constraints: any }) => {
    // const newErrorObject = {};
    // newErrorObject[prop.property] = prop.constraints;
    // console.error(newErrorObject);
    return {
      field: `${prop.property}`,
      message: `${Object.keys(prop.constraints)[0]}`,
    };
    return `${prop.property}#${Object.keys(prop.constraints)[0]}`;
    // return newErrorObject;
  });
};

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    // Pass `skipMissingProperties` as part of the custom validation
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException(marshalValidationErrors(errors));
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}

```

### TypeORM

```bash
yarn add typeorm pg mysql
```

**ormconfig.json**

```bash
{
   "type": "postgres",
   "host": "localhost",
   "port": 5432,
   "username": "sadmin",
   "password": "123456",
   "database": "mycourse",
   "synchronize": true,
   "logging": false,
   "entities": [
      "src/entity/**/*.ts"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}
```

### Moment vs DayJS

```js
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import moment from 'moment';

const createdAtUTCTime = dayjs
  .utc()
  .format(`YYYY-MM-DDTHH:mm:ss.${'S'.repeat(6)}Z`); // '2021-06-16T17:08:55.081081+00:00'
const updatedAtUTCTime = moment
  .utc()
  .format(`YYYY-MM-DDTHH:mm:ss.${'S'.repeat(6)}Z`); // 2021-06-16T17:08:55.084000+00:00'

CURRENT_TIMESTAMPZ IN POSTGRESQL : 2021-06-16 16:29:08.435634+00
```
