"use strict";
import validator from "../src/validator.js";
import { print } from "./data.js";

new validator(-23).isConvertibleToNegativeInteger
  .and.bind(new validator("-2.3e2").isConvertibleToNegativeInteger)
  .and.bind(new validator("not convertible").not.isConvertibleToNegativeInteger)
  .and.bind(new validator("" + -Math.PI).not.isConvertibleToNegativeInteger)
  .and.bind(new validator("-0").not.isConvertibleToNegativeInteger)
  .on(true, (v) => {
    const t1 = v.benchmark((n) =>
      new validator(n).isConvertibleToNegativeInteger
    );
    const t2 = v.benchmark((n) => !isNaN(+n) && Number.isInteger(n) && n < 0);
    print("is convertible to negative integer", t1, t2);
  }).on(
    false,
    () => console.log("Error in isConvertibleToNegativeInteger test..."),
  );
