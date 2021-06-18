/* eslint-disable @typescript-eslint/ban-ts-comment */
import { plainToClass } from 'class-transformer';
import { CreateCategoryDTO, Database, validateDTO } from './libs';
import util from 'util';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import moment from 'moment';

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

const runQuery = async (db: Database, query: string) => {
  debug(true, { query });
  const result = await db.runQuery(query);
  debug(true, { result });
};

(async () => {
  try {
    const { errors, valid } = await validateDTO(category, 'category', {});
    debug(true, 'categoryDTO:valid', valid);
    debug(true, 'categoryDTO:errors', errors);
    const db = new Database();
    await db.connect();
    // test
    await runQuery(db, 'SELECT * FROM res_example');
    // @ts-ignore
    const createdAtUTCTime = dayjs
      .utc()
      .format(`YYYY-MM-DDTHH:mm:ss.${'S'.repeat(6)}Z`);
    const updatedAtUTCTime = moment
      .utc()
      .format(`YYYY-MM-DDTHH:mm:ss.${'S'.repeat(6)}Z`);
    const productAttr: any = {
      color: 'green',
      discount: 0
    };
    const example_data = {
      so_nam: 123,
      so_luong_hang_hoa: 1,
      gia_ban: 100,
      first_name: 'Abc',
      khoi_lop: 'A',
      noi_dung: 'something great',
      ki_hieu: 'abb',
      is_deleted: false,
      created_at: createdAtUTCTime,
      updated_at: updatedAtUTCTime,
      phones:
        '{' +
        ['(408)-589-5846', '(408)-589-5555'].map((v) => `"${v}"`).join(',') +
        '}',
      ngay_sinh: '1990-11-23',
      gio_sinh: '23:15',
      chiet_khau: 0.15,
      ngay_gio_sinh: '1990-11-23 23:15',
      ngay_hen: createdAtUTCTime,
      san_pham: JSON.stringify({
        items: [
          { product: 'Ta giay', qty: 1, unit: 'bich' },
          { product: 'Sua hop 300ml', qty: 6, unit: 'hop' }
        ]
      }),
      product_attr: Object.keys(productAttr)
        .map((k) => `"${k}" => "${productAttr[k]}"`)
        .join(','),
      customer_name: 'Lalala'
    };
    await runQuery(
      db,
      `
    INSERT INTO res_example(${Object.keys(example_data).join(',')})
    VALUES (${Object.values(example_data)
      .map((v) => `'${v}'`)
      .join(',')})
    RETURNING id;
    `
    );
    // const idNumber = '123 or 1 = 1';
    // const idString = "123' or '1' = '1";
    // const idStringExecuteAnother = "123'; DELETE FROM res_post WHERE '1' = '1";
    // const sqlInjection1 = `SELECT * FROM res_example where id = ${idNumber}`;
    // const sqlInjection2 = `SELECT * FROM res_example where id = '${idString}'`;
    // const sqlInjection3 = `SELECT * FROM res_example where id = '${idStringExecuteAnother}'`;
    // await runQuery(db, sqlInjection1);
    // await runQuery(db, sqlInjection2);
    // await runQuery(db, sqlInjection3);
  } catch (error) {
    console.error(error);
  }
})();
