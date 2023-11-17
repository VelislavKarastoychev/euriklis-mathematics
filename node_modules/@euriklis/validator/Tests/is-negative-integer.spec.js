"use strict";
import validator from "../src/validator.js";
import { print } from "./data.js";

new validator(-23).isNegativeInteger
  .and.bind(new validator(-0).not.isNegativeInteger)
  .and.bind(new validator(Math.PI).not.isNegativeInteger)
  .and.bind(
    new validator("this is not a negative integer").not.isNegativeInteger
  )
  .and.bind(new validator(-Math.E).not.isNegativeInteger)
  .on(true, (v) => {
    const t1 = v.benchmark((n) => new validator(n).isNegativeInteger.answer);
    const t2 = v.benchmark((n) =>
      typeof n === "number" && !isNaN(n) && Number.isInteger(n) && n < 0
    );
    print("is negative integer", t1, t2);
  }).on(false, () => console.log("Error in isNegativeInteger test..."));
