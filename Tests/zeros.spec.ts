"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";

new validator(Matrix.zeros(5000, 5000).M)
  .isArrayOfArraysWithEqualSize
  .and.forEvery((row) => row.forEvery((el) => el.isSame(0)))
  .describe("The zeros method has to produce matrix with zero elements.")
  .test()
  .on(true, () => {
    const benchmark = new validator(Matrix).benchmark((m) => m.zeros(5000, 5000));
    console.table(benchmark)
  });
