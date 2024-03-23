"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src";
import { Integer, MatrixType, NumericMatrix } from "../src/Matrix/types";

const r1: NumericMatrix = Matrix.random(
  3,
  3,
  -1,
  1,
  "generic",
) as NumericMatrix;
const r2: NumericMatrix = Matrix.copy(r1, "generic") as NumericMatrix;
const absRowSumExceptDiagonalAsRow = [
  r2.map((row: number[], i: number) => {
    let sum = 0;
    row.forEach((
      p: number,
      j: number,
    ) => sum += +(i !== j) * Math.abs(p));
    return sum;
  }),
];

const absRowSumExceptDiagonalAsColumn = r2.reduce(
  (norm1: number[][], row: number[], i: Integer) => {
    norm1[i] = [row.reduce((sum: number, el: number, j: Integer) => {
      sum += +(i !== j) * Math.abs(el);
      return sum;
    }, 0)];
    return norm1;
  },
  [],
);

const callAbsRowSum = (m: MatrixType | NumericMatrix) => Matrix.absoluteSumOfRowElementsExceptDiagonal(m);
new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.absoluteSumOfRowElementsExceptDiagonal(r1),
      absRowSumExceptDiagonalAsRow,
    ),
  ) < 1e-8,
).describe("The absoluteSumOfRowElementsExceptDiagonal method has to:")
  .test({ title: true, success: "green", error: "red" })
  .isSame(true)
  .describe(
    "1. return the correct result in row vector by default when the parameters are correctly defined.",
  )
  .test();

new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.absoluteSumOfRowElementsExceptDiagonal(r1, undefined, "column"),
      absRowSumExceptDiagonalAsColumn,
    ),
  ) < 1e-8,
).describe(
  "2. return the correct result as column vector when the mode is set to 'column'.",
)
  .isSame(true)
  .test();

new validator(callAbsRowSum)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .and.throwsErrorWith("it throws")
  .describe("3. throw error when the matrix parameter is incorrectly defined.")
  .test();
