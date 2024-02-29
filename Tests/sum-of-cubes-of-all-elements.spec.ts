"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types.ts";
const m = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
const callSumOfCubes = (m: MatrixType | NumericMatrix) => Matrix.sumOfCubesOfAllElements(m);
new validator(Matrix.sumOfCubesOfAllElements(m)).isSame(2025)
  .describe("The sumOfCubesOfAllElements getter method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).describe("1. compute the correct result (never NaN result).")
  .test();

new validator(callSumOfCubes)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .throwsErrorWith("will thorw error!")
  .describe("2. throw error when the matrix is incorrectly defined.")
  .test();
