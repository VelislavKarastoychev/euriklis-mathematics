"use strict";
import validator from "../src/validator.js";
import { matrix, print } from "./data.js";
new validator(matrix).isArrayOfNumberArrays.on(true, (v) => {
  const t1 = v.benchmark((n) => new validator(n).isArrayOfNumberArrays.answer);
  const t2 = v.benchmark((n) =>
    n instanceof Array
      ? n.every((item) =>
        item.every((el) => typeof el === "number" && !isNaN(el))
      )
      : false
  );
  print("isArrayOfNumberArrays with 1000000 elements", t1, t2);
});

