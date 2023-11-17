import validator from "../src/validator.js";
import { negativeNumericArray, print } from "./data.js";
new validator(negativeNumericArray).isArrayOfNegativeNumbers.on(true, (v) => {
  const t1 = v.benchmark((n) =>
    new validator(n).isArrayOfNegativeNumbers.answer
  );
  const t2 = v.benchmark((n) =>
    n instanceof Array
      ? n.every((item) => typeof item === "number" && !isNaN(item) && item < 0)
      : false
  );
  print("isArrayOfNegativeNumbers with 1000000 elements", t1, t2);
});
