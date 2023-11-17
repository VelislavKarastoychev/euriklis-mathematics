"use strict";
import validator from "../src/validator.js";
import { print } from "./data.js";

new validator(12).isEqual(12)
  .and.bind(new validator("12").not.isEqual(12))
  .and.bind(
    new validator(() => new validator(12).isEqual("12")).throwsErrorWith(),
  )
  .on(true, (v) => {
    const t1 = v.benchmark((n) => new validator(n).isEqual(12).answer);
    const t2 = v.benchmark((n) =>
      typeof n === "number" && !Number.isNaN(n) ? n === 12 : false
    );
    print("is equal", t1, t2);
  }).on(false, () => console.log("Error in isEqual test..."));
