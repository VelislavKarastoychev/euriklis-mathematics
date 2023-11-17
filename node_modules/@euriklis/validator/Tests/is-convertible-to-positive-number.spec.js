"use strict";
import validator from "../src/validator.js";
import { print } from "./data.js";

new validator(22).isConvertibleToPositiveNumber
  .and.bind(new validator("3.2238482").isConvertibleToPositiveNumber)
  .and.bind(new validator("this is not convertible").not.isConvertibleToPositiveNumber)
  .and.bind(new validator(-Math.E).not.isConvertibleToPositiveNumber)
  .and.bind(new validator("-0").isConvertibleToPositiveNumber)
  .and.bind(new validator(-0).isConvertibleToPositiveNumber)
  .and.bind(new validator("0.438394e-42").isConvertibleToPositiveNumber)
  .and.bind(new validator(".458484284").isConvertibleToPositiveNumber)
  .and.bind(new validator("-.48483e12").not.isConvertibleToPositiveNumber)
  .on(true, (v) => {
    const t1 = v.benchmark((n) => new validator(n).isConvertibleToPositiveNumber)
    const t2 = v.benchmark((n) => !Number.isNaN(+n) && n >= 0);
    print("is convertible to positive number", t1, t2);
  }).on(false, () => console.log("Error in isConvertibelToPositiveNumber"));
