"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";

new validator(Matrix.identityLike(15, 51).M)
  .describe("The identityLike and identity static methods:").test({title: true, success: "green", error: "red"})
  .describe(
    "1. Have to generates matrix with zero elements except for the diagonal elements which are equal to onces",
  )
  .forEvery((row, i) => {
    return row.forEvery((el, j) => {
      return el.isSame(0).and.bind(
        new validator(i).not.isSame(j),
      ).or.isSame(1);
    });
  }).test()
  .and.isArray
  .describe("2. Time performance of the identity(Like) method with parameters rows = 5000 and columns = 5000")
  .test()
  .on(true, () => {
    const benchmark = new validator(Matrix).benchmark(m => m.identityLike(5000, 5000))
    console.table(benchmark);
  });
