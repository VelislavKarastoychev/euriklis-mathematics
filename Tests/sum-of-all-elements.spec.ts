"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import type { MatrixType, NumericMatrix } from "../src/Types";
const m = [
  [-3, 5, 7],
  [2, 6, 4],
  [0, 2, 8],
];

const callSumOfAllElements = (m: MatrixType | NumericMatrix) =>
  Matrix.sumOfAllElements(m);
new validator(Matrix.sumOfAllElements(m)).isSame(31)
  .describe("The sumOfAllElements getter method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).describe(
    "1. return the correct value (the sum of all elements of the matrix).",
  )
  .test();

new validator(callSumOfAllElements)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .and.throwsErrorWith("this throws")
  .describe("2. throw error when the matrix is incorrectly defined")
  .test();
