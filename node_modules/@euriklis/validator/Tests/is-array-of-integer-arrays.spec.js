"use strict";
import validator from "../src/validator.js";
import { integerMatrix, print } from "./data.js";
integerMatrix[0].push(Math.PI >> 0);
new validator(integerMatrix).isArrayOfIntegerArrays.on(true, (v) => {
  const t1 = v.benchmark((n) => new validator(n).isArrayOfIntegerArrays.answer);
  const t2 = v.benchmark((n) =>
    n.every((row) =>
      row instanceof Array ? row.every((el) => Number.isInteger(el)) : false
    )
  );
  print("isArrayOfIntegerArrays", t1, t2);
}).on(
  false,
  () => console.log("Something went wrong in isArrayOfIntegerArrays!"),
);
integerMatrix[0].pop();

