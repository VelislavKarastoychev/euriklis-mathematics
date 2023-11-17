"use strict";
import validator from "../src/validator.js";
import { intArray, negativeIntArray, numericArray, print } from "./data.js";

new validator(negativeIntArray).isArrayOfNegativeIntegers
  .and.bind(new validator("not array").not.isArrayOfNegativeIntegers)
  .and.bind(new validator(intArray).not.isArrayOfNegativeIntegers)
  .and.bind(new validator(numericArray).not.isArrayOfNegativeIntegers)
  .and.bind(new validator(numericArray).not.isArrayOfNegativeIntegers)
  .on(true, (v) => {
    const t1 = v.benchmark((n) =>
      new validator(n).isArrayOfNegativeIntegers.answer
    );
    const t2 = v.benchmark((n) =>
      n instanceof Array
        ? n.every((el) =>
          typeof el === "number" && !isNaN(el) && Number.isInteger(el) && el < 0
        )
        : false
    );
    print("isArrayOfNegativeIntegers", t1, t2);
  }).on(false, () => console.log("Error in isArrayOfNegativeIntegers"));
