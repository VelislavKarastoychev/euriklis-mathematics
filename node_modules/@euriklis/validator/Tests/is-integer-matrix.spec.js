"use strict";
import validator from "../src/validator.js";
import { integerMatrix, print } from "./data.js";
new validator(integerMatrix).isArrayOfIntegerArraysWithEqualSize.on(true, (v) => {
  const t1 = v.benchmark((n) =>
    new validator(n).isArrayOfIntegerArraysWithEqualSize.answer
  );
  const t2 = v.benchmark((n) => {
    const l = n instanceof Array ? n[0].length : -1;
    return n instanceof Array
      ? n.every((row) =>
        row.every((el) => Number.isInteger(el)) && row.length === l
      )
      : false;
  });
  print("isArrayOfIntegerArraysWithEqualSize", t1, t2);
}).on(
  false,
  () =>
    console.log(
      "Something went wrong with isArrayOfIntegerArraysWithEqualSize!",
    ),
);

