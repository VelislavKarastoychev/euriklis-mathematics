"use strict";
import { Matrix } from "../src";
import validator from "@euriklis/validator-ts";
import type { MatrixType, NumericMatrix } from "../src/Types";

const r1 = Matrix.random(5, 9);
const r2 = Matrix.random(9, 11);
const v1 = Matrix.replicate(Math.PI, 5, 1);
const v2 = Matrix.replicate(Math.E, 9, 1);
const callSetDiagonalToColumnVector = (
  m: MatrixType | NumericMatrix,
  v: MatrixType | NumericMatrix,
): MatrixType | NumericMatrix => Matrix.setDiagonalToColumnVector(m, v);

new validator(
  Matrix.isEqualTo(
    Matrix.getDiagonal(
      Matrix.setDiagonalToColumnVector(r1, v1),
    ),
    Matrix.reshape(v1, 1, 5),
  ) && Matrix.isEqualTo(
    Matrix.getDiagonal(
      Matrix.setDiagonalToColumnVector(r2, v2),
    ),
    Matrix.reshape(v2, 1, 9),
  ),
).describe("The setDiagonalToColumnVector method has to:")
  .test({ title: true, success: "green", error: "red" })
  .isSame(true)
  .describe(
    "1. sets correctly the diagonal elements of a matrix by given column vector with appropriate dimensions.",
  )
  .test();

new validator(callSetDiagonalToColumnVector)
  .throwsErrorWith([1, 2, 3])
  .and.throwsErrorWith("it throws.")
  .describe("2. throw error when the vecotr parameter is incorrectly defined.")
  .test();
