import { plainToClass } from 'class-transformer';
import { CreateCategoryDTO, validateDTO } from './libs';
import util from 'util';
const debug = (...theArgs: any[]) => {
  console.error(util.inspect(theArgs));
};
const categoryJSON = { name: '', tags: [] };
const category = plainToClass(CreateCategoryDTO, categoryJSON);

debug('category', category);
const str = 'hello';
debug(str);

(async () => {
  const { values, errors } = await validateDTO(category);
  debug('categoryDTO', values, errors);
})();
