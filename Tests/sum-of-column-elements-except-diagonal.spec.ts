"use strict";
import { Matrix } from "../src";
import validator from "@euriklis/validator-ts";
import type { MatrixType, NumericMatrix } from "../src/Types";

// this file has a test for the
// method sumOfColumnsExceptDiagonal.
const m1 = Matrix.uniqueRandom(7, 9);
const m2 = Matrix.uniqueRandom(9, 7);
new validator(
  Matrix.isEqualTo(
    Matrix.sumOfColumnElementsExceptDiagonal(m1),
    Matrix.transpose(
      Matrix.sumOfColumnElementsExceptDiagonal(
        m1,
        undefined,
        "column",
      ),
    ),
  ),
).and.bind(
  new validator(
    Matrix.isEqualTo(
      Matrix.sumOfColumnElementsExceptDiagonal(m2, undefined, "column"),
      Matrix.transpose(
        Matrix.sumOfColumnElementsExceptDiagonal(m2),
      ),
    ),
  ),
).isSame(true)
  .describe("The sumOfColumnELementsExceptDiagonal method has to:")
  .test({ title: true, success: "green", error: "red" })
  .describe(
    "1. produce the correct result and to return a row vector by default and a column vector when 'mode' is set to 'columns'.",
  ).test();

new validator((m: MatrixType | NumericMatrix) =>
  Matrix.sumOfColumnElementsExceptDiagonal(m)
)
  .throwsErrorWith("this throws!!!")
  .and.throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .describe("2. throw error when the matrix parameter is incorrectly defined.")
  .test();
