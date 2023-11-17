"use strict";
import validator from "../src/validator.js";
import { stringMatrix, print } from "./data.js"
new validator(stringMatrix).isArrayOfStringArraysWithEqualSize.on(true, (v) => {
  const t1 = v.benchmark((n) =>
    new validator(n).isArrayOfStringArraysWithEqualSize.answer
  );
  const t2 = v.benchmark((n) => {
    const l = n instanceof Array
      ? n[0] instanceof Array ? n[0].length : -1
      : -1;
    return n instanceof Array
      ? n.every((row) =>
        row instanceof Array
          ? row.length === l && row.every((el) => typeof el === "string")
          : false
      )
      : false;
  });
  print("isArrayOfStringArraysWithEqualSize", t1, t2);
}).on(
  false,
  () =>
    console.log("Something went wrong in isArrayOfStringArraysWithEqualSize!"),
);

