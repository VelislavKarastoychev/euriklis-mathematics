import validator from '../src/validator.js';  
import { print } from "./data.js";
const test = new validator(123);

const tests = {
  "value": test.value,
  "is string": test.isString.answer,
  "is number": test.isNumber.answer,
  "is object": test.isObject.answer,
  "is integer": test.isInteger.answer,
  "is negative integer": test.isNegativeInteger.answer,
  "is numeric array": test.isNumberArray.answer,
  "is number like": test.isConvertibleToNumber.answer,
  "is integer and is in range (0, 200) or is string":
    test.isInteger.and.isInRange(0, 200).or.isString.answer,
  "is object + And": test.isObjectArray.and.answer,
  "is positive (number)": test.isPositive.answer,
};
console.table(tests);

new validator(Math.PI + "").isString.or.isPositive.and.not.isBoolean
  .describe("Logically complicated operations are executed correctly.").test()
  .on(
  true,
  (v) => {
    const t1 = v.benchmark((n) =>
      new validator(n).isString.or.isPositive.and.not.isBoolean.answer
    );
    const t2 = v.benchmark((n) =>
      typeof n === "number"
        ? n >= 0
        : typeof n === "string" && typeof n !== "boolean"
    );
    print("isString.Or.isPositive.And.Not.isBoolean", t1, t2);
  },
);
