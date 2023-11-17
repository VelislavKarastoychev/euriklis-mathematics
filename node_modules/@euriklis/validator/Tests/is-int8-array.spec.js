"use strict";
import validator from "../src/validator.js";
import { intArray, print } from "./data.js";

const int8Array = new Int8Array(intArray);

new validator(int8Array).isInt8Array
  .and.bind(new validator(intArray).not.isInt8Array)
  .and.bind(new validator({}).not.isInt8Array)
  .and.bind(new validator("string").not.isInt8Array)
  .on(true, (v) => {
    const t1 = v.benchmark((n) => new validator(n).isInt8Array.answer);
    const t2 = v.benchmark((n) =>
      Object.prototype.toString.call(n) === "[object Int8Array]"
    );
    print("isInt8Array", t1, t2);
  }).on(false, () => console.log("Error in isInt8Array"));
