"use strict";
import validator from "../src/validator.js";
import { matrix, print } from "./data.js";
new validator(matrix).isArrayOfNumberArraysWithEqualSize.on(true, (v) => {
  const t1 = v.benchmark((m) =>
    new validator(m).isArrayOfNumberArraysWithEqualSize.answer
  );
  const t2 = v.benchmark((m) =>
    m instanceof Array
      ? m.every((row) => {
        const isRowArray = row instanceof Array;
        const n = isRowArray ? row[0].length : -1;
        return isRowArray
          ? row.every((item) =>
            typeof item === "number" && !isNaN(item) && row.length === n
          )
          : false;
      })
      : false
  );
  print("isArrayOfNumberArraysWithEqualSize with 1000000 elements", t1, t2);
});

