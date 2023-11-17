"use strict";
import validator from "../src/validator.js";
import { intArray, print } from "./data.js";

const uint8ClampedArray = new Uint8ClampedArray(intArray);

new validator(uint8ClampedArray).isUint8ClampedArray
  .and.bind(new validator(intArray).not.isUint8ClampedArray)
  .and.bind(new validator("not uint array").not.isUint8ClampedArray)
  .and.bind(new validator({}).not.isUint8ClampedArray)
  .on(true, (v) => {
    const t1 = v.benchmark((n) => new validator(n).isUint8ClampedArray.answer);
    const t2 = v.benchmark((n) =>
      Object.prototype.toString.call(n) === "[object Uint8ClampedArray]"
    );
    print("isUint8ClampedArray", t1, t2);
  }).on(false, () => console.log("Error in isUint8ClampedArray test..."));
