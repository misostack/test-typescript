import { plainToClass } from 'class-transformer';
import { CreateCategoryDTO, validateDTO } from './libs';
import util from 'util';
const debug = (inspected = false, ...theArgs: any[]) => {
  return inspected
    ? console.error(util.inspect(theArgs, true, 5, true))
    : console.error(theArgs);
};
const categoryJSON = { name: 'snm123', tags: ['abc'] };
const category = plainToClass(CreateCategoryDTO, categoryJSON);

debug(false, 'category', category);
const str = 'hello';
debug(false, str);

(async () => {
  const { values, errors } = await validateDTO(category);
  debug(true, 'categoryDTO:values', values);
  debug(true, 'categoryDTO:errors', errors);
})();
