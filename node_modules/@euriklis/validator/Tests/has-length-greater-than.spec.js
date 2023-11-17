"use strict";
import validator from "../src/validator.js";
import { numericArray, print } from "./data.js";
const l = 999999;
new validator(numericArray).hasLengthGreaterThan(l)
  .describe("The method hasLengthGreaterThan may be executed on an array.")
  .test()
  .and.bind(new validator("hello world").hasLengthGreaterThan(10))
  .describe("The method hasLengthGreaterThan may be applied on strings.")
  .test()
  .on(true, (v) => {
    const t1 = v.benchmark((n) =>
      new validator(n).hasLengthGreaterThan(l).answer
    );
    const t2 = v.benchmark((n) => n instanceof Array && n.length > l);
    print("hasLengthGreaterThan", t1, t2);
  }).on(false, () => console.log("Error in hasLengthGreaterThan test..."));
