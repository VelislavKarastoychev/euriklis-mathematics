"use strict";
import validator from "../src/validator.js";
import { print, matrix } from "./data.js";
new validator(matrix).forEvery((item) => item.isArrayOfNumbersInRange(0, 1))
  .describe("The forEvery test has to pass through all elements of an iterable").test()
  .on(true, (v) => {
  const t1 = v.benchmark((n) =>
    new validator(n).forEvery((el) => el.isNumberArray).answer
  );
  const t2 = v.benchmark(
    (n) =>
      n instanceof Array
        ? n.every((row) =>
          row instanceof Array
            ? row.every((el) => typeof el === "number" && !isNaN(el))
            : false
        )
        : false,
    1000,
  );
  print("for every", t1, t2);
}).on(false, () => console.log("Error in for every"));

