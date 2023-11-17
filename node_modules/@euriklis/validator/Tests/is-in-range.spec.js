"use strict";
import validator from "../src/validator.js";
import { print } from "./data.js";

new validator(Math.PI).isInRange(3, 4)
  .and.bind(new validator(Math.E).isInRange(2, Infinity))
  .and.bind(new validator("1").not.isInRange(0, 2))
  .and.bind(
    new validator((a, b) => new validator(1).isInRange(a, b)).throwsErrorWith("0", "1")
  ).on(true, (v) => {
    const t1 = v.benchmark((n) => new validator(n).isInRange(2, 3).answer);
    const t2 = v.benchmark((n) => typeof n === "number" && !isNaN(n) && n > 2 && n < 3);
    print("is in range", t1, t2);
  }).on(false, () => console.log('Error in isInRange test...'));
