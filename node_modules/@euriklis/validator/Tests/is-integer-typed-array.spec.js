"use strict";
import validator from "../src/validator.js";
import { intArray, print } from "./data.js";

const int8Array = new Int8Array(intArray);
const uint8Array = new Uint8Array(intArray);
const uint8ClampedArray = new Uint8ClampedArray(intArray);
const int16Array = new Int16Array(intArray);
const uint16Array = new Uint16Array(intArray);
const int32Array = new Int32Array(intArray);
const uint32Array = new Uint32Array(intArray);
new validator(int8Array).isIntegerTypedArray
  .and.bind(new validator(uint8ClampedArray).isIntegerTypedArray)
  .and.bind(new validator(uint8Array).isIntegerTypedArray)
  .and.bind(new validator(int16Array).isIntegerTypedArray)
  .and.bind(new validator(uint16Array).isIntegerTypedArray)
  .and.bind(new validator(int32Array).isIntegerTypedArray)
  .and.bind(new validator(uint32Array).isIntegerTypedArray)
  .on(true, (v) => {
    const t1 = v.benchmark((n) => new validator(n).isIntegerTypedArray.answer);
    const t2 = v.benchmark((n) =>
      Object.prototype.toString.call(n) === "[object Int8Array]"
    );
    print("isIntegerTypedArray", t1, t2);
  }).on(false, () => console.log("Error in isIntegerTypedArray test..."));
