"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src";
import type { Integer, MatrixType, NumericMatrix } from "../src/Types";

const r1 = Matrix.uniqueRandom(7, 9);
const r2 = Matrix.copy(r1, "generic") as NumericMatrix;
let sumOfSquaresOfColumnElementsAsRow: number[][] | number[] = [];
let sumOfSquaresOfColumnElementsAsColumn: number[][] = [];
r2.forEach((row: number[], i: Integer) => {
  row.forEach((item: number, j: Integer) => {
    if (!i) {
      sumOfSquaresOfColumnElementsAsRow[j] = 0;
      sumOfSquaresOfColumnElementsAsColumn[j] = [0];
    }
    (sumOfSquaresOfColumnElementsAsRow as number[])[j] += item * item;
    sumOfSquaresOfColumnElementsAsColumn[j][0] += item * item;
  });
});
sumOfSquaresOfColumnElementsAsRow = [
  sumOfSquaresOfColumnElementsAsRow as number[],
];
const callSumOfSquaresOfColumnElements = (m: MatrixType | NumericMatrix) =>
  Matrix.sumOfSquaresOfColumnElements(m);
new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.sumOfSquaresOfColumnElements(r1),
      sumOfSquaresOfColumnElementsAsRow,
    ),
  ) <= 1e-8,
).describe("The sumOfSquaresOfColumnElements method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  })
  .isSame(true)
  .describe(
    "1. obtain the correct output when the matrix input is correctly defined as row vector by default.",
  )
  .test();

new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.sumOfSquaresOfColumnElements(r1, undefined, "column"),
      sumOfSquaresOfColumnElementsAsColumn,
    ),
  ) <= 1e-8,
).describe(
  "2. obtain the correct result and return a column vector when the 'mode' parameter is set to 'column'.",
)
  .isSame(true)
  .test();

new validator(callSumOfSquaresOfColumnElements)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .and.throwsErrorWith("it throws")
  .describe("3. throw error when the matrix parametr is incorrectly defined.")
  .test();
