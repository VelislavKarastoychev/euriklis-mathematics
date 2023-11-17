"use strict";
import validator from "../src/validator.js";
import { intArray, print } from "./data.js";

const uint32Array = new Uint32Array(intArray);
new validator(uint32Array).isUint32Array
  .and.bind(new validator(intArray).not.isUint32Array)
  .and.bind(new validator({}).not.isUint32Array)
  .and.bind(new validator("not uint array").not.isUint32Array)
  .on(true, (v) => {
    const t1 = v.benchmark((n) => new validator(n).isUint32Array.answer);
    const t2 = v.benchmark((n) =>
      Object.prototype.toString.call(n) === "[object Uint32Array]"
    );
    print("isUint32Array", t1, t2);
  }).on(false, () => console.log("Error in isUint32Array test..."));
