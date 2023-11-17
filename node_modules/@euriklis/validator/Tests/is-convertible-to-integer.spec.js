"use strict";
import validator from "../src/validator.js";
import { print } from "./data.js";

new validator(1234).isConvertibleToInteger
  .and.bind(new validator('111222333').isConvertibleToInteger)
  .and.bind(new validator("3.14159226536").not.isConvertibleToInteger)
  .and.bind(new validator("3.14159226536e22").isConvertibleToInteger)
  .on(true, (v) => {
    const t1 = v.benchmark((n) => new validator(n).isConvertibleToInteger.answer);
    const t2 = v.benchmark((n) => Number.isInteger(+n));
    print('is convertible to integer', t1, t2);
  }).on(false, () => console.log('Error in isConvertibleToInteger test...'));
