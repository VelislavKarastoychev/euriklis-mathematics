"use strict";
import validator from "../src/validator.js";
import { print } from "./data.js";

new validator(Math.E).isLessThanOrEqual(Math.PI)
  .and.bind(new validator("12").not.isLessThanOrEqual(14))
  .and.bind(new validator(() => new validator(12).isLessThanOrEqual("Error")).throwsErrorWith())
  .on(true, (v) => { 
    const t1 = v.benchmark((n) => new validator(n).isLessThanOrEqual(22).answer);
    const t2 = v.benchmark((n) => typeof n === "number" ? n <= 22 : false);
    print("is less than or equal", t1, t2);
  }).on(false, () => console.log("Error in isLessThanOrEqual test..."));
