"use strict";
import validator from "../src/validator.js";
import { intArray, print } from "./data.js";

const uint8Array = new Uint8Array(intArray);

new validator(uint8Array).isUint8Array
  .and.bind(new validator(intArray).not.isUint8Array)
  .and.bind(new validator([]).not.isUint8Array)
  .and.bind(new validator({}).not.isUint8Array)
  .and.bind(new validator("not uint8Array").not.isUint8Array)
  .on(true, (v) => {
    const t1 = v.benchmark((n) => new validator(n).isUint8Array.answer);
    const t2 = v.benchmark((n) =>
      Object.prototype.toString.call(n) === "[object Uint8Array]"
    );
    print("isUint8Array", t1, t2);
  }).on(false, () => console.log("Error in isUint8Array test..."));
