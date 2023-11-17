"use strict";
import validator from "../src/validator.js";
import { addMatrices, print } from "./data.js";
const addMatricesValidator = new validator(addMatrices);
addMatricesValidator.isFunction.and.throwsErrorWith(null, [[2]]).on(true, () => {
  return 0;
});
addMatricesValidator
  .throwsErrorWith(undefined, undefined).on(true, () => {
    const t1 = addMatricesValidator.copy().benchmark((f) =>
      new validator(f).throwsErrorWith().answer
    );
    const t2 = addMatricesValidator.benchmark((f) => {
      try {
        const s = f();
        return s;
      } catch (error) {
        return error;
      }
    });
    print("throws error with", t1, t2);
  })
  .on(false, () => console.log('Something went wrong...'));
;

