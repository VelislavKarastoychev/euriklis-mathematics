"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";

const matrix: number[][] = [
  [1, 2, 3],
  [2, 4, 5],
  [3, 5, 6]
];

const m = new Matrix(matrix);
new validator(m.isSymmetric).isSame(true)
  .describe("The isSymmetric getter method has to:")
  .test({
    title: true,
    success: "green",
    error: "red"
  }).describe("1. return true when the matrix is symmetric")
  .test();

new validator(Matrix.random(3, 4).isSymmetric).isSame(false)
  .describe("2. return false when the matrix is not square.")
  .test();
