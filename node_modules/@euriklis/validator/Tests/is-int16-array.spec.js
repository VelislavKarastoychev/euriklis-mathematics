"use strict";
import validator from "../src/validator.js";
import { intArray, print } from "./data.js";

const int16Array = new Int16Array(intArray);

new validator(int16Array).isInt16Array
  .and.bind(new validator("not int16 array").not.isInt16Array)
  .and.bind(new validator(intArray).not.isInt16Array)
  .and.bind(new validator({}).not.isInt16Array)
  .on(true, (v) => {
    const t1 = v.benchmark((n) => new validator(n).isInt16Array.answer);
    const t2 = v.benchmark((n) =>
      Object.prototype.toString.call(n) === "[object Int16Array]"
    );
    print("isInt16Array", t1, t2);
  }).on(false, () => console.log("Error in isInt16Array test..."));
