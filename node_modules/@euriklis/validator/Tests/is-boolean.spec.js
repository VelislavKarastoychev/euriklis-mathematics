"use strict";
import validator from "../src/validator.js";
import { print } from "./data.js";

new validator(true).isBoolean.and.not.isInteger.on(true, (v) => {
  const t1 = v.benchmark((b) => new validator(b).isBoolean.answer);
  const t2 = v.benchmark((b) => typeof b === "boolean");
  print("is boolean", t1, t2);
})
