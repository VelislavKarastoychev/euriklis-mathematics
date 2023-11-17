"use strict";
import validator from "../src/validator.js";
import { print, matrix } from "./data.js";
new validator(matrix)
  .forAny((v) => {
    return v.isArrayOfNumbersInRange(0, 1);
  }).describe("The forAny method has to pass through all elements of an iterable.").test()
  .on(true, (v) => {
    const t1 = v.benchmark((n) =>
      new validator(n).forAny((k) => k.isArrayOfNumbersInRange(0, 1))
        .answer, 1000
    );
    const t2 = v.benchmark((m) => {
      m instanceof Array
        ? m.some((row) => {
          return row instanceof Array
            ? row.every((item) =>
              !Number.isNaN(item) ? item > 1 && item < 2 : false
            )
            : false;
        })
        : false;
    });
    print('for any', t1, t2);
  });

