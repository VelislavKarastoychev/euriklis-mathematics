"use strict";
import validator from "../src/validator.js";
import { matrix, print } from "./data.js";
new validator(matrix).isArrayOfArraysWithEqualSize.on(true, (v) => {
  const t1 = v.benchmark((n) =>
    new validator(n).isArrayOfArraysWithEqualSize.answer
  );
  const t2 = v.benchmark((n) =>
    n instanceof Array
      ? n.every((item) =>
        item instanceof Array ? item.length === n[0].length : false
      )
      : false
  );
  print("isArrayOfArraysWithEqualSize with 1000000 elements", t1, t2);
});

