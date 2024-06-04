"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import type { MatrixType, NumericMatrix } from "../src/Types";

const m = [
  [-3, 5, 7],
  [2, 6, 4],
  [0, 2, 8],
];

const callSumOfSquares = (m: MatrixType | NumericMatrix) =>
  Matrix.sumOfSquaresOfAllElements(m);
new validator(Matrix.sumOfSquaresOfAllElements(m)).isSame(207)
  .describe("The sumOfSquaresOfAllElements getter method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).describe("1. compute the correct result (never negative or NaN result).")
  .test();

new validator(callSumOfSquares)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .and.throwsErrorWith("this throws")
  .describe("2. throw error when the matrix is incorrectly declared.")
  .test();
