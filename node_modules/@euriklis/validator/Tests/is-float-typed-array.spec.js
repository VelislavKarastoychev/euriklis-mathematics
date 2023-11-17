"use strict";
import validator from "../src/validator.js";
import { numericArray, print } from "./data.js";

const float32Array = new Float32Array(numericArray);
const float64Array = new Float64Array(numericArray);
new validator(float32Array).isFloatTypedArray
  .and.bind(new validator(float64Array).isFloatTypedArray)
  .and.bind(new validator(new Int32Array([])).not.isFloatTypedArray)
  .on(true, (v) => {
    const t1 = v.benchmark((n) => new validator(n).isFloatTypedArray.answer);
    const t2 = v.benchmark((n) =>
      Object.prototype.toString.call(n) === "[object Float32Array]"
    );
    print("isFloatTypedArray", t1, t2);
  }).on(false, () => console.log("Error in isFloatTypedArray test..."));
