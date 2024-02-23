"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types.ts";
const mtx = Matrix.random(3, 1, 2, 4, "generic");
const m: MatrixType | NumericMatrix = Matrix.random(2, 50);
new validator(Matrix.toDiagonalMatrix(m, "generic")).forEvery((row, i) => {
  return row.forEvery((el, j) =>
    (i as number % 50) === j ? el.isNotEqual(0) : el.isEqual(0)
  );
})
  .describe("toDiagonalMatrix method has to:").test({
    title: true,
    success: "green",
    error: "red",
  })
  .describe(
    "1. generate a row oriented collection of diagonal block matrices for each row of the matrix.",
  ).test();

new validator(() => Matrix.toDiagonalMatrix(mtx))
  .describe("2. throw error when the matrix parameter is a column vector.")
  .throwsErrorWith()
  .test();
