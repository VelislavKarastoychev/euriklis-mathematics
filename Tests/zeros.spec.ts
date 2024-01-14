"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";
import { Integer } from "../src/Matrix/types.ts";
const zeros = Array.from({ length: 5000 }).map((_) =>
  Array.from({ length: 5000 }).map((_) => 0)
);
const generateZeroMatrix = (rows: Integer, columns: Integer) =>
  Matrix.zeros(rows, columns);
new validator(Matrix.zeros(5000, 5000).M)
  .describe("The zeros static method:").test({
    title: true,
    success: "green",
    error: "red",
  })
  .isArrayOfArraysWithEqualSize
  .and.isSame(zeros)
  .describe("1. Has to produce matrix with zero elements")
  .test()
  .and.isInstanceof(Array)
  .and.bind(
    new validator(generateZeroMatrix).throwsErrorWith(-1, 20)
      .and.throwsErrorWith(-10, -20.4)
      .and.throwsErrorWith(10, -2)
      .and.throwsErrorWith(5, Math.PI)
      .and.not.throwsErrorWith(3, 4),
  ).describe(
    "2. Throws error when the rows or columns are incorrectly (inappropriately) defined.",
  ).test()
