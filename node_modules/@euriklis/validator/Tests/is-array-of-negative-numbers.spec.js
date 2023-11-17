"use strict";
import validator from "../src/validator.js";
import { negativeNumericArray, numericArray, print } from "./data.js";

new validator(negativeNumericArray).isArrayOfNegativeNumbers
  .and.bind(new validator(numericArray).not.isArrayOfNegativeNumbers)
  .and.bind(new validator(Math.PI).not.isArrayOfNegativeNumbers)
  .and.bind(new validator("not array").not.isArrayOfNegativeNumbers)
  .on(true, (v) => {
    const t1 = v.benchmark((n) =>
      new validator(n).isArrayOfNegativeNumbers.answer
    );
    const t2 = v.benchmark((n) =>
      n instanceof Array 
        ? n.every((el) => typeof el === "number" && !isNaN(el) && el < 0)
        : false
    );
    print("isArrayOfNegativeNumbers", t1, t2);
  }).on(false, () => console.log("Error in isArrayOfNegativeNumbers test..."));
