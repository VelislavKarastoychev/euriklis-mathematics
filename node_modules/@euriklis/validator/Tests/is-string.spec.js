"use strict";

import validator from "../src/validator.js";
import { print } from "./data.js";

new validator("This is string").isString.and.bind(
  new validator(["This is not string"]).not.isString,
).on(true, (v) => {
  const t1 = v.benchmark((s) => new validator(s).isString.answer);
  const t2 = v.benchmark((s) => typeof s === "string");
  print("is string", t1, t2);
}).on(false, () => console.log("Error in isString test..."));
