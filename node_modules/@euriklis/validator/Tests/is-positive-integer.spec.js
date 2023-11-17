"use strict";
import validator from "../src/validator.js";
import { print } from "./data.js";

new validator(23).isPositiveInteger
  .and.bind(new validator(-23).not.isPositiveInteger)
  .and.bind(new validator(22 / 7).not.isPositiveInteger)
  .and.bind(new validator("223").not.isPositiveInteger)
  .and.bind(new validator(Math.PI).not.isPositiveInteger)
  .and.bind(new validator(0.0).isPositiveInteger)
  .and.bind(new validator(4.0).isPositiveInteger)
  .on(true, (v) => {
    const t1 = v.benchmark((n) => new validator(n).isPositiveInteger.answer);
    const t2 = v.benchmark((n) =>
      typeof n === "number" && !isNaN(n) && Number.isInteger(n)
    );
    print("is positive integer", t1, t2);
  }).on(false, () => console.log("Error in isPositiveInteger test..."));
