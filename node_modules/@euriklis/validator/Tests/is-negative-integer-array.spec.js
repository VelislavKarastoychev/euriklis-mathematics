import validator from '../src/validator.js';
import { print, negativeIntArray } from "./data.js"
new validator(negativeIntArray).isArrayOfNegativeIntegers.on(true, (v) => {
  const t1 = v.benchmark((n) =>
    new validator(n).isArrayOfNegativeIntegers.answer
  );
  const t2 = v.benchmark((n) =>
    n instanceof Array
      ? n.every((item) => Number.isInteger(item) && item < 0)
      : false
  );
  print("isArrayOfNegativeIntegers with 1000000 elements", t1, t2);
}).on(
  false,
  () => console.log("Something went wrong with isArrayOfNegativeIntegers!!!"),
);

