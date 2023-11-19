"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";

new validator(Matrix.zeros(5000, 5000).M)
  .describe("The zeros static method:").test({title: true, success: "green", error: "red"})
  .isArrayOfArraysWithEqualSize
  .and.forEvery((row) => row.forEvery((el) => el.isSame(0)))
  .describe("1. Has to produce matrix with zero elements")
  .test()
  .and.isInstanceof(Array)
  .describe("2. Performance of the zeros method with rows = 5000, columns = 5000, type = 'float64'")
  .test()
  .on(true, () => {
    const benchmark = new validator(Matrix).benchmark((m) => m.zeros(5000, 5000));
    console.table(benchmark)
  })
