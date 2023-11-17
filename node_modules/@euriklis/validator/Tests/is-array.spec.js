"use strict";
import validator from "../src/validator.js";
import { intArray, numericArray, print } from "./data.js";

new validator([]).isArray
  .and.bind(new validator(intArray).isArray)
  .and.bind(new validator(numericArray).isArray)
  .and.bind(new validator({}).not.isArray)
  .and.bind(new validator(new Int32Array()).not.isArray)
  .and.bind(new validator("not array").not.isArray)
  .on(true, (v) => {
    const t1 = v.benchmark((n) => new validator(n).isArray.answer);
    const t2 = v.benchmark((n) => n instanceof Array && !(n instanceof Object));
    print("is array", t1, t2);
  }).on(false, () => console.log("Error in isArray test..."));
