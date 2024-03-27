"use strict";
import { Matrix } from "../src";
import validator from "@euriklis/validator-ts";
import { Integer, MatrixType, NumericMatrix } from "../src/Matrix/types";

const r1 = Matrix.uniqueRandom(7, 9);
const r2 = Matrix.copy(r1, "generic") as NumericMatrix;

const sumOfSquaresOfRowElementsExceptDiagonalAsRow = [r2.map(
  (row: number[], i: Integer) => {
    return row.reduce((accum: number, currentElement: number, j: Integer) => {
      accum += +(i !== j) * (currentElement * currentElement);
      return accum;
    }, 0);
  },
)];

const sumOfSquaresOfRowElementsExceptDiagonalAsColumn = r2.map(
  (row: number[], i: Integer) => {
    return [row.reduce((accum: number, currentElement: number, j: Integer) => {
      accum += +(i !== j) * (currentElement * currentElement);
      return accum;
    }, 0)];
  },
);
const callSumOfSquaresOfRowElementsExceptDiagonal = (
  m: MatrixType | NumericMatrix,
) => Matrix.sumOfSquaresOfRowElementsExceptDiagonal(m);
new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.sumOfSquaresOfRowElementsExceptDiagonal(r1),
      sumOfSquaresOfRowElementsExceptDiagonalAsRow,
    ),
  ) < 1e-8,
).describe("The sumOfSquaresOfRowElementsExceptDiagonal method has to:")
  .test({ title: true, success: "green", error: "red" })
  .isSame(true)
  .describe(
    "1. calculate the correct result and to return row vector by default.",
  )
  .test();

new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.sumOfSquaresOfRowElementsExceptDiagonal(r1, undefined, "column"),
      sumOfSquaresOfRowElementsExceptDiagonalAsColumn,
    ),
  ) < 1e-8,
).describe(
  "2. calculate the correct result and to return column vector when the 'mode' parameter is set to 'column'.",
)
  .isSame(true)
  .test();

new validator(callSumOfSquaresOfRowElementsExceptDiagonal)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .and.throwsErrorWith("it throws")
  .describe("3. throw error when the matrix parameter is incorrectly defined.")
  .test();
