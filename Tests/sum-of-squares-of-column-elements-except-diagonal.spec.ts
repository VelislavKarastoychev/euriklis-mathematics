"use strict";
import validator from "@euriklis/validator-ts";
import { Integer, MatrixType, NumericMatrix } from "../src/Matrix/types";
import { Matrix } from "../src";

const r1 = Matrix.uniqueRandom(7, 9);
const r2 = Matrix.copy(r1, "generic") as NumericMatrix;
let sumOfSquaresOfColumnElementsExceptDiagonalAsRow = [];
let sumOfSquaresOfColumnElementsExceptDiagonalAsColumn = [];

r2.forEach((row: number[], i: Integer) => {
  row.forEach((item: number, j: Integer) => {
    if (!i) {
      sumOfSquaresOfColumnElementsExceptDiagonalAsRow[j] = 0;
      sumOfSquaresOfColumnElementsExceptDiagonalAsColumn[j] = [0];
    }
    const square = +(i !== j) * item * item;
    sumOfSquaresOfColumnElementsExceptDiagonalAsRow[j] += square;
    sumOfSquaresOfColumnElementsExceptDiagonalAsColumn[j][0] += square;
  });
});
sumOfSquaresOfColumnElementsExceptDiagonalAsRow = [
  sumOfSquaresOfColumnElementsExceptDiagonalAsRow,
];
const callSumOfSquaresOfColumnElementsExceptDiagonal = (
  m: MatrixType | NumericMatrix,
) => Matrix.sumOfSquaresOfColumnElementsExceptDiagonal(m);
new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.sumOfSquaresOfColumnElementsExceptDiagonal(r1),
      sumOfSquaresOfColumnElementsExceptDiagonalAsRow,
    ),
  ) <= 1e-8,
).describe("The sumOfSquaresOfColumnElementsExceptDiagonal method has to:")
  .test({ title: true, success: "green", error: "red" })
  .isSame(true)
  .describe("1. compute the correct result as a row vector by default.")
  .test();

new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.sumOfSquaresOfColumnElementsExceptDiagonal(
        r1,
        undefined,
        "column",
      ),
      sumOfSquaresOfColumnElementsExceptDiagonalAsColumn,
    ),
  ) <= 1e-8,
).describe(
  "2. compute the correct output as a column vector when the 'mode' parameter is set to 'column'",
)
  .isSame(true)
  .test();

new validator(callSumOfSquaresOfColumnElementsExceptDiagonal)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .throwsErrorWith("it throws!!!")
  .describe("3. throw error when the matrix parameter is incorrectly defined.")
  .test();
