"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import type { Integer } from "../src/Types";
const zeros = Array.from({ length: 50 }).map((_) =>
  Array.from({ length: 50 }).map((_) => 0)
);
const generateZeroMatrix = (rows: Integer, columns: Integer) =>
  Matrix.zeros(rows, columns);

new validator(Matrix.zeros(50, 50))
  .describe("The zeros static method:").test({
    title: true,
    success: "green",
    error: "red",
  })
  .describe("1. Has to produce matrix with zero elements")
  .isArrayOfAbstractArraysWithEqualSize
  .and.bind(
    new validator(Matrix.zeros(50, 50).map((el: any) => [...el])).isSame(zeros)
  )
  .test();
new validator(Matrix.zeros(50, 50))
  .isInstanceof(Array)
  .and.bind(
    new validator(generateZeroMatrix).throwsErrorWith(-1, 20)
      .and.throwsErrorWith(-10, -20.4)
      .and.throwsErrorWith(10, -2)
      .and.throwsErrorWith(5, Math.PI)
      .and.not.throwsErrorWith(3, 4),
  ).describe(
    "2. Throws error when the rows or columns are incorrectly (inappropriately) defined.",
  ).test();
