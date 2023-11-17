import validator from "../src/validator.js";
import { intArray, print } from "./data.js";
new validator(intArray).isIntegerArray.on(true, (v) => {
  const t1 = v.benchmark((n) => new validator(n).isIntegerArray.answer);
  const t2 = v.benchmark((n) =>
    n instanceof Array ? n.every(Number.isInteger) : false
  );
  print("isIntegerArray for 1000000 elements", t1, t2);
});
