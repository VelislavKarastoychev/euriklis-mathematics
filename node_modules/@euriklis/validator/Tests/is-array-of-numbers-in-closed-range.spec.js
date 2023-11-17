"use strict";
import validator from "../src/validator.js";
import { numericArray,print } from "./data.js";
new validator(numericArray).isArrayOfNumbersInClosedRange(0, 100).on(
  true,
  (v) => {
    const t1 = v.benchmark((n) =>
      new validator(n).isArrayOfNumbersInClosedRange(0, 100).answer
    );
    const t2 = v.benchmark((n) =>
      n instanceof Array
        ? n.every((item) =>
          (typeof item === "number" && !isNaN(item))
            ? item <= 100 && item >= 0
            : false
        )
        : false
    );
    print(
      "is_array of numbers in closed range (0, 100) with 1000000 elements",
      t1,
      t2,
    );
  }).on(false, () => console.log("Something went wrong ..."));

