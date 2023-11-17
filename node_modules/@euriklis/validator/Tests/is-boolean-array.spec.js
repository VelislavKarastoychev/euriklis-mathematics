import validator from "../src/validator.js";
import { print, booleanArray } from './data.js';
new validator(booleanArray).isBooleanArray.or.isBoolean.on(true, (v) => {
  const t1 = v.benchmark((b) => new validator(b).isBooleanArray.answer);
  const t2 = v.benchmark((
    b,
  ) => (b instanceof Array
    ? b.every((item) => typeof item === "boolean")
    : false)
  );
  print("isBooleanArray with 1000000 elements", t1, t2);
});

