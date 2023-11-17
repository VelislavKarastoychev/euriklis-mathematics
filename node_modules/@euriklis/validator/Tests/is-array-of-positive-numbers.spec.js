import validator from "../src/validator.js";
import { numericArray, print } from "./data.js";
new validator(numericArray).isArrayOfPositiveNumbers.on(true, (v) => {
  const t1 = v.benchmark((n) =>
    new validator(n).isArrayOfPositiveNumbers.answer
  );
  const t2 = v.benchmark((n) =>
    n instanceof Array
      ? n.every((item) => typeof item === "number" && !isNaN(item) && item >= 0)
      : false
  );
  print("isArrayOfPositiveNumbers with 1000000 elements", t1, t2);
});
