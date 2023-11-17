"use strict";
import validator from "../src/validator.js";
import { print } from "./data.js";
const f = () => {};
const asyncF = async () => {};
new validator(f).isFunction
  .and.bind(new validator(asyncF).not.isFunction)
  .and.bind(new validator([]).not.isFunction)
  .on(true, (v) => {
    const t1 = v.benchmark((n) => new validator(n).isFunction.answer);
    const t2 = v.benchmark((n) => n instanceof Function);
    print("isFunction", t1, t2);
  }).on(false, () => console.log("Error in isFunction test..."));
