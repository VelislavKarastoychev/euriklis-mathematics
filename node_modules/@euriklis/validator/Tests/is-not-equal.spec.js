"use strict";
import validator from "../src/validator.js";
import { print } from "./data.js";

new validator(12).isNotEqual(15)
  .and.bind(new validator(12).isNotEqual(Math.PI * Math.E))
  .and.bind(new validator(() => new validator(1).isNotEqual("1")).throwsErrorWith())
  .on(true, (v) => {
    const t1 = v.benchmark((n) => new validator(n).isNotEqual(13).answer);
    const t2 = v.benchmark((n) => typeof n === "number" && !isNaN(n) && n !== 13);
    print("is not equal", t1, t2);
  }).on(false, () => console.log("Error in isNotEqual test..."));
