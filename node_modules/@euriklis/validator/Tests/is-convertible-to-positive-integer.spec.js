"use strict";
import validator from "../src/validator.js";
import { print } from "./data.js";

new validator("0.48232e12").isConvertibleToPositiveInteger
  .and.bind(new validator("-23").not.isConvertibleToPositiveInteger)
  .and.bind(new validator(Math.PI).not.isConvertibleToPositiveInteger)
  .and.bind(new validator("" + Math.E).not.isConvertibleToPositiveInteger)
  .and.bind(new validator("-.448328e-2").not.isConvertibleToPositiveInteger)
  .and.bind(new validator("not convertible").not.isConvertibleToPositiveInteger)
  .on(true, (v) => {
    const t1 = v.benchmark((n) =>
      new validator(n).isConvertibleToPositiveInteger.answer
    );
    const t2 = v.benchmark((n) => !isNaN(+n) && Number.isInteger(n) && +n >= 0);
    print("is convertible to positive integer", t1, t2);
  }).on(
    false,
    () => console.log("Error in isConvertibleToNegativeInteger test..."),
  );
