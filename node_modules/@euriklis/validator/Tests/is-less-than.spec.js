"use strict";
import validator from "../src/validator.js";
import { print } from "./data.js";

new validator(32).isLessThan(64)
  .and.bind(new validator(Math.PI).isLessThan(32))
  .and.bind(new validator(Math.E).not.isLessThan(Math.E))
  .and.bind(new validator("35").not.isLessThan(36)) // because the arg is not number.
  .and.bind(new validator(() => new validator("34").isLessThan("This is not correct")).throwsErrorWith())
  .on(true, (v) => {
    const t1 = v.benchmark((n) => new validator(n).isLessThan(64).answer);
    const t2 = v.benchmark((n) => n < 64);
    print("is less than", t1, t2);
  }).on(false, () => console.log("Error in isLessThan test..."));
