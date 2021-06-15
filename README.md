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

### Class Transformer

```js
import { plainToClass } from 'class-transformer';
import { CreateCategoryDTO, validateDTO } from './libs';
const categoryJSON = { name: '', tags: [] }; // json object
// transform to class
const category = plainToClass(CreateCategoryDTO, categoryJSON);
```

### Class Validator

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

1. Trong angular validator của form là sync hay async
2. Khi nào validator run : khi user submit hay khi giá trị change?
3. Co' cach nao optimize hok
4. Làm thế nào để share dữ liệu giữa các component
5. Cách quản lý state trong app angular
6. Làm sao để truy cập DOM trong Angular và dùng để làm gì
7. Cách để xây dựng 1 ứng dụng hỗ trợ multi language trong Angular - giải pháp

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
