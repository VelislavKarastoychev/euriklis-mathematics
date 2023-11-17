"use strict";
import validator from "../src/validator.js";
import { print } from "./data.js";

new validator(22).isPositive.and.isInRange(0, 23)
  .and.bind(new validator(0).isPositive)
  .and.bind(new validator(-0).isPositive)
  .and.bind(new validator(-22).not.isPositive)
  .and.bind(new validator("22").not.isPositive)
  .and.bind(new validator({}).not.isPositive.and.not.throwsErrorWith())
  .on(true, (v) => {
    const t1 = v.benchmark((n) => new validator(n).isPositive.answer);
    const t2 = v.benchmark((n) => typeof n === "number" && !isNaN(n) && n >= 0);
    print("is positive", t1, t2);
  }).on(false, () => console.log("Error in isPositive tests..."));
