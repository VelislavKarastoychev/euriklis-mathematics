"use strict";
import { Integer, MatrixType, NumericMatrix } from "../src/Matrix/types";
import { Matrix } from "../src";
import validator from "@euriklis/validator-ts";

const abs = Math.abs;
const r1 = Matrix.uniqueRandom(8, 7);
const r2 = Matrix.copy(r1, "generic") as NumericMatrix;
const callAbsoluteSumOfColumnElementsExceptDiagonal = (
  m: MatrixType | NumericMatrix,
) => Matrix.absoluteSumOfColumnElementsExceptDiagonal(m);

const absoluteSumOfColumnElementsExceptDiagonalAsRow = new Array(r2[0].length)
  .fill(0);
const absoluteSumOfColumnElementsExceptDiagonalAsColumn =
  absoluteSumOfColumnElementsExceptDiagonalAsRow.map((_) => [0]);
r2.forEach((row: number[], i: Integer) => {
  row.forEach((el: number, j: Integer) => {
    if (i !== j) {
      absoluteSumOfColumnElementsExceptDiagonalAsRow[j] += abs(el);
      absoluteSumOfColumnElementsExceptDiagonalAsColumn[j][0] += abs(el);
    }
  });
});

new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.absoluteSumOfColumnElementsExceptDiagonal(r1),
      [absoluteSumOfColumnElementsExceptDiagonalAsRow],
    ),
  ) < 1e-8,
).describe("The absoluteSumOfColumnElementsExceptDiagonal method has to:")
  .test({ title: true, success: "green", error: "red" })
  .isSame(true)
  .describe(
    "1. return the correct output when the matrix parameter is correctly defined as row vector by default.",
  )
  .test();

new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.absoluteSumOfColumnElementsExceptDiagonal(r1, undefined, "column"),
      absoluteSumOfColumnElementsExceptDiagonalAsColumn,
    ),
  ) < 1e-8,
).describe(
  "2. return the correct result as column vector when the mode parameter is set to 'column'",
)
  .isSame(true)
  .test();

new validator(callAbsoluteSumOfColumnElementsExceptDiagonal)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .and.throwsErrorWith("it throws!!!")
  .describe("3. throw error when the matrix parameter is incorrectly defined.")
  .test();
