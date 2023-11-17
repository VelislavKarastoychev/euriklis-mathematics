"use strict";
import validator from "../src/validator.js";
import { print } from "./data.js";

new validator(1235).isInteger.and.bind(new validator(Math.PI).not.isInteger).on(
  true,
  (v) => {
    const t1 = v.benchmark((n) => new validator(n).isInteger.answer);
    const t2 = v.benchmark((n) => Number.isInteger(n));
    print("is integer", t1, t2);
  },
).on(false, () => console.log("Error in isInteger test..."));
