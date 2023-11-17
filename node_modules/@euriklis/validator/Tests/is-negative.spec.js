"use strict";
import validator from "../src/validator.js";
import { print } from "./data.js";

new validator(-23).isNegative
  .and.bind(new validator(22).not.isNegative)
  .and.bind(new validator("123").not.isNegative)
  .and.bind(new validator(-0).not.isNegative)
  .and.bind(new validator(() => new validator("NaN")).not.throwsErrorWith())
  .on(true, (v) => {
    const t1 = v.benchmark((n) => new validator(n).isNegative.answer);
    const t2 = v.benchmark((n) => typeof n === "number" && !isNaN(n) && n < 0);
    print("is negative", t1, t2);
  }).on(false, () => console.log("Error in isNegative test..."));
