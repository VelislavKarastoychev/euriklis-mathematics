"use strict";
import validator from "../src/validator.js";
import { print } from "./data.js";

new validator(new Date()).isDate
  .and.bind(new validator(new Date("this is not date")).not.isDate)
  .and.bind(new validator(new Date("12/23/2001")).isDate)
  .on(true, (v) => {
    const t1 = v.benchmark((n) => new validator(n).isDate.answer);
    const t2 = v.benchmark((n) => n instanceof Date);
    print("isDate", t1, t2);
  }).on(false, () => console.log("Error in isDate test..."));
