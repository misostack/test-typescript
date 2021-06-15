import { plainToClass } from 'class-transformer';
import { CreateCategoryDTO } from './libs';

const categoryJSON = { name: '', tags: [] };
const category = plainToClass(CreateCategoryDTO, categoryJSON);

console.error('category', category);
const str = 'hello';
console.error(str);

module.exports = () => {
  console.error('aaa');
};
