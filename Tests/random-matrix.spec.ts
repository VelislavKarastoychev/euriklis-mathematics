"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";
const randomMatrix = new validator(
  Matrix.random(3, 3, -1, 1, "float64", 123456),
);
randomMatrix
  .describe("The Matrix.random static method:").test({
    title: true,
    success: "green",
    error: "red",
  })
  .isInstanceof(Matrix)
  .and.bind(
    new validator(() => randomMatrix.copy().value.M)
      .executeWith()
      .isArrayOfNumberArraysWithEqualSize,
  ).describe("1. Has to generate random matrix with numbers form -1 to 1")
  .test()
  .isInstanceof(Matrix)
  .describe(
    "2. Performance of the random static method for rows = 5000, columns = 5000, from = - and to = 1:",
  ).test()
  .on(true, () => {
    const b = new validator(Matrix).benchmark(m => m.random(5000, 5000, -1, 1));
    console.table(b);
  });
