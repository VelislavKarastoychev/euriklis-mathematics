"use strict";
import validator from "../src/validator.js";
import { intArray, print } from "./data.js";

const int32Array = new Int32Array(intArray);
new validator(int32Array).isInt32Array
  .and.bind(new validator(intArray).not.isInt32Array)
  .and.bind(new validator("not int32 array").not.isInt32Array)
  .and.bind(new validator({}).not.isInt32Array)
  .on(true, (v) => {
    const t1 = v.benchmark((n) => new validator(n).isInt32Array.answer);
    const t2 = v.benchmark((n) =>
      Object.prototype.toString.call(n) === "[object Int32Array]"
    );
    print("isInt32Array", t1, t2);
  }).on(false, () => console.log("Error in isInt32Array test..."));
