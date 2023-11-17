"use strict";
import validator from "../src/validator.js";
import { matrix, print } from "./data.js";

new validator(matrix).isArrayOfArrays
  .and.bind(new validator("not array").not.isArrayOfArrays)
  .and.bind(new validator([{}, {}, {}]).not.isArrayOfArrays)
  .on(true, (v) => {
    const t1 = v.benchmark((n) => new validator(n).isArrayOfArrays.answer);
    const t2 = v.benchmark((n) =>
      n instanceof Array ? n.every((el) => el instanceof Array) : false
    );
    print("isArrayOfArrays", t1, t2);
  }).on(false, () => console.log("Error in isArrayOfArrays"));
