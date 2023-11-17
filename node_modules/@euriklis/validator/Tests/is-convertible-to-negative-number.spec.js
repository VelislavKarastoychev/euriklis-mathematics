"use strict";
import validator from "../src/validator.js";
import { print } from "./data.js";

new validator(-23).isConvertibleToNegativeNumber
  .and.bind(new validator(-0).not.isConvertibleToNegativeNumber)
  .and.bind(
    new validator("this is not convertible").not.isConvertibleToNegativeNumber,
  )
  .and.bind(new validator("2.33982831e-22").not.isConvertibleToNegativeNumber)
  .and.bind(new validator("-.043483284e2").isConvertibleToNegativeNumber)
  .on(true, (v) => {
    const t1 = v.benchmark((n) =>
      new validator(n).isConvertibleToNegativeNumber.answer
    );
    const t2 = v.benchmark((n) => !isNaN(+n) && n < 0);
    print("is convertible to negative number", t1, t2);
  }).on(
    false,
    () => console.log("Error in the isConvertibleToNegativeNumber test..."),
  );
