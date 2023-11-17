"use strict";
import validator from "../src/validator.js";
import { numericArray, print } from "./data.js";

const float64Array = new Float64Array(numericArray);

new validator(float64Array).isFloat64Array
  .and.bind(new validator(numericArray).not.isFloat64Array)
  .and.bind(new validator({}).not.isFloat64Array)
  .and.bind(new validator("not is float64 array").not.isFloat64Array)
  .on(true, (v) => {
    const t1 = v.benchmark((n) => new validator(n).isFloat64Array.answer);
    const t2 = v.benchmark((n) =>
      Object.prototype.toString.call(n) === "[object Float64Array]"
    );
    print("isFloat64Array", t1, t2);
  }).on(false, () => console.log("Error in isFloat64Array"));
