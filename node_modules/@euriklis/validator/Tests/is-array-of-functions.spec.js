"use strict";
import validator from "../src/validator.js";
import { functionArray, print } from "./data.js";
new validator(functionArray).isArrayOfFunctions.on(true, (v) => {
  const t1 = v.benchmark((n) => new validator(n).isArrayOfFunctions.answer);
  const t2 = v.benchmark((n) =>
    n instanceof Array ? n.every((item) => typeof item === "function") : false
  );
  print("isArrayOfFunctions with 1000000 elements", t1, t2);
});
