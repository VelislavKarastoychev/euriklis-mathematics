"use strict";
import validator from "../src/validator.js";
import { print } from "./data.js";

new validator("35939.349e-14").isConvertibleToNumber
  .and.bind(new validator(Math.PI).isConvertibleToNumber)
  .and.bind(new validator("23 is a number").not.isConvertibleToNumber).on(
    true,
    (v) => {
      const t1 = v.benchmark((n) =>
        new validator(n).isConvertibleToNumber.answer
      );
      const t2 = v.benchmark((n) => typeof Number(n) === "number");
      print("is convertible to number", t1, t2);
    },
  ).on(false, () => console.log("Error in isConvertibleToNumber"));
