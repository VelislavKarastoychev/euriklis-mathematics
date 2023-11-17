"use strict";
import validator from "../src/validator.js";
import { print } from "./data.js";

new validator(12).isGreaterThanOrEqual(11)
  .and.bind(new validator(Math.PI).isGreaterThanOrEqual(Math.PI))
  .and.bind(new validator(() => new validator("12").isGreaterThanOrEqual("Not correct")).throwsErrorWith())
  .on(true, (v) => {
    const t1 = v.benchmark((n) => new validator(n).isGreaterThanOrEqual(12).answer);
    const t2 = v.benchmark((n) => n >= 12);
    print("is greater than or equal", t1, t2);
  }).on(false, () => console.log("Error in isGreaterThanOrEqual test..."));
