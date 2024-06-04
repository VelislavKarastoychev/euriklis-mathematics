"use strict";
import { Matrix } from "../src";
import validator from "@euriklis/validator-ts";
import type { MatrixType, NumericMatrix } from "../src/Types";

const r1 = Matrix.random(5, 9);
const r2 = Matrix.random(9, 11);
const v1 = Matrix.replicate(Math.E, 1, 5);
const v2 = Matrix.replicate(Math.E, 1, 9);
const callSetDiagonalToRowVector = (
  m: MatrixType | NumericMatrix,
  v: MatrixType | NumericMatrix,
): MatrixType | NumericMatrix => Matrix.setDiagonalToRowVector(m, v);

new validator(
  Matrix.isEqualTo(
    Matrix.getDiagonal(
      Matrix.setDiagonalToRowVector(r1, v1),
    ),
    v1,
  ) && Matrix.isEqualTo(
    Matrix.getDiagonal(
      Matrix.setDiagonalToRowVector(
        r2,
        v2,
      ),
    ),
    v2,
  ),
).describe("The setDiagonalToRowVector method has to:")
  .test({ title: true, success: "green", error: "red" })
  .isSame(true)
  .describe("1. sets the diagonal elements of a matrix to the given vector.")
  .test();

new validator(callSetDiagonalToRowVector)
  .throwsErrorWith(r1, "it troows")
  .and.throwsErrorWith([1, 3])
  .describe("2. throws error when the vector parameter is incorrectly defined.")
  .test();
