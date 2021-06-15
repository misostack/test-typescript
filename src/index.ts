import { plainToClass } from 'class-transformer';
import { CreateCategoryDTO, validateDTO } from './libs';
import util from 'util';
const debug = (inspected = false, ...theArgs: any[]) => {
  return inspected
    ? console.error(util.inspect(theArgs, true, 5, true))
    : console.error(theArgs);
};
const categoryJSON = { name: '', tags: [] };
const category = plainToClass(CreateCategoryDTO, categoryJSON);

debug(false, 'category', category);
const str = 'hello';
debug(false, str);

(async () => {
  const { errors, valid } = await validateDTO(category);
  debug(true, 'categoryDTO:valid', valid);
  debug(true, 'categoryDTO:errors', errors);
})();
