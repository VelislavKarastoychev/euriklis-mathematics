"use strict";
import validator from "../src/validator.js";
import { print } from "./data.js";

new validator(Math.PI).isFloat.and.bind(new validator(23).not.isFloat).on(
  true,
  (v) => {
    const t1 = v.benchmark((n) => new validator(n).isFloat.answer);
    const t2 = v.benchmark((n) =>
      typeof n === "number" && !isNaN(n) && !Number.isInteger(n)
    );
    print("is float", t1, t2);
  },
).on(false, () => console.log("Error in isFloat test..."));
