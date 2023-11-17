"use strict";
import validator from "../src/validator.js";
import { print } from "./data.js";
const buffer = new ArrayBuffer(23);
new validator(buffer).isArrayBuffer
  .and.bind(new validator([]).not.isArrayBuffer)
  .and.bind(new validator({}).not.isArrayBuffer)
  .and.bind(new validator("this is not buffer").not.isArrayBuffer)
  .on(true, (v) => {
    const t1 = v.benchmark((n) => new validator(n).isArrayBuffer.answer);
    const t2 = v.benchmark((n) =>
      Object.prototype.toString.call(n) === "[object ArrayBuffer]"
    );
    print("is array buffer", t1, t2);
  }).on(false, () => console.log("Error in isArrayBuffer test..."));
