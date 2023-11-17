import validator from "../src/validator.js";
import { intArray, print } from "./data.js";
new validator(intArray).isArrayOfPositiveIntegers.on(true, (v) => {
  const t1 = v.benchmark((n) =>
    new validator(n).isArrayOfPositiveIntegers.answer
  );
  const t2 = v.benchmark((n) =>
    n instanceof Array
      ? n.every((item) => Number.isInteger(item) ? item >= 0 : false)
      : false
  );
  print("isArrayOfPositiveIntegers with 1000000 elements", t1, t2);
});
