"use strict";
import { Matrix } from "../src";
import { MatrixType, NumericMatrix } from "../src/Matrix/types";
import validator from "@euriklis/validator-ts";
const r1 = Matrix.random(3, 5);
const r2 = Matrix.random(5, 7);
const m1 = Matrix.copy(r1);
const m2 = Matrix.copy(r2);
const n = Math.PI;
const callSetDiagonalToNumber = (m: MatrixType, n: number) =>
  Matrix.setDiagonalToNumber(m, n);

new validator(
  Matrix.isEqualTo(
    Matrix.getDiagonal(
      Matrix.setDiagonalToNumber(m1, n),
    ),
    Matrix.replicate(n, 1, 3),
  ),
).and.bind(
  new validator(
    Matrix.isEqualTo(
      Matrix.getDiagonal(
        Matrix.setDiagonalToNumber(m2, n),
      ),
      Matrix.replicate(n, 1, 5),
    ),
  ).isSame(true),
)
  .describe("The setDiagonalToNumber method has to:")
  .test({ title: true, success: "green", error: "red" })
  .isSame(true)
  .describe("1. sets the diagonal to the given number")
  .test();

new validator(callSetDiagonalToNumber)
  .throwsErrorWith(m1, [1, 2])
  .and.throwsErrorWith(m1, "it will throw")
  .describe("2. throw error when the second argument is not number.")
  .test();
