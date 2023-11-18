"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";

new validator(Matrix.identityLike(15, 51).M)
  .describe(
    "The identity like method has to generates matrix with zero elements except for the diagonal elements which are equal to onces.",
  )
  .forEvery((row, i) => {
    return row.forEvery((el, j) => {
      return el.isSame(0).and.bind(
        new validator(i).not.isSame(j),
      ).or.isSame(1);
    });
  }).test()
  .on(true, () => {
    const benchmark = new validator(Matrix).benchmark(m => m.identityLike(5000, 5000))
    console.table(benchmark);
  });
