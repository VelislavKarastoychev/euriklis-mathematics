"use strict";
import { numericArray, print } from "./data.js";
import validator from "../src/validator.js";
new validator(numericArray).isArrayOfNumbersInRange(-1, 100).on(
  true,
  (v) => {
    const t1 = v.benchmark((n) =>
      new validator(n).isArrayOfNumbersInRange(-1, 100).answer
    );
    const t2 = v.benchmark((n) =>
      n instanceof Array
        ? n.every((item) =>
          (typeof item === "number" && !isNaN(item))
            ? item < 100 && item > -1
            : false
        )
        : false
    );
    print(
      "is_array of numbers in range (-1, 100) with 1000000 elements",
      t1,
      t2,
    );
  },
).on(false, () => console.log("Something went wrong ..."));
