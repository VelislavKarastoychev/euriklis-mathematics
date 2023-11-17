"use strict";
import validator from "../src/validator.js";
import { intArray, print } from "./data.js";

const uint16Array = new Uint16Array(intArray);
new validator(uint16Array).isUint16Array
  .and.bind(new validator(intArray).not.isUint16Array)
  .and.bind(new validator({}).not.isUint16Array)
  .and.bind(new validator("not uint16 array").not.isUint16Array)
  .on(true, (v) => {
    const t1 = v.benchmark((n) => new validator(n).isUint16Array.answer);
    const t2 = v.benchmark((n) =>
      Object.prototype.toString.call(n) === "[object uint16Array]"
    );
    print("isUint16Array", t1, t2);
  }).on(false, () => console.log("Error in isUint16Array test..."));
