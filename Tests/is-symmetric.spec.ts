"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types.ts";

const matrix: number[][] = [
  [1, 2, 3],
  [2, 4, 5],
  [3, 5, 6],
];

new validator(Matrix.isSymmetric(matrix)).isSame(true)
  .describe("The isSymmetric getter method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).describe("1. return true when the matrix is symmetric")
  .test();

new validator(Matrix.isSymmetric(Matrix.random(3, 4))).isSame(false)
  .describe("2. return false when the matrix is not square.")
  .test();

new validator(Matrix.isSymmetric(Matrix.random(3, 3))).isSame(false)
  .describe("3. return false when the matrix is not symmetric.")
  .test();

new validator((m: MatrixType | NumericMatrix) => Matrix.isSymmetric(m))
  .throwsErrorWith([
    [1, 2, 3],
    [1, 23],
    [123],
  ]).describe("4. throws error when the matrix is not a table.")
  .test();
