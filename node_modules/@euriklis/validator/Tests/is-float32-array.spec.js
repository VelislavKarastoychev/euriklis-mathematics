"use strict";
import validator from "../src/validator.js";
import { numericArray, print } from "./data.js";

const float32Array = new Float32Array(numericArray);
new validator(float32Array).isFloat32Array
  .and.bind(new validator(numericArray).not.isFloat32Array)
  .and.bind(new validator({}).not.isFloat32Array)
  .and.bind(new validator("not float32 array").not.isFloat32Array)
  .on(true, (v) => {
    const t1 = v.benchmark((n) => new validator(n).isFloat32Array.answer);
    const t2 = v.benchmark((n) =>
      Object.prototype.toString.call(n) === "[object Float32Array]"
    );
    print("isFloat32Array", t1, t2);
  }).on(false, () => console.log("Error in isFloat32Array test..."));
