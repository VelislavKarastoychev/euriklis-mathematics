"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src";
import type { MatrixType, NumericMatrix } from "../src/Types";

const a = [[4, 12, -16], [12, 37, -43], [-16, -43, 98]];
const l = [[2, 0, 0], [6, 1, 0], [-8, 5, 3]];
const callLL = (m: MatrixType | NumericMatrix): MatrixType | NumericMatrix =>
  Matrix.LL(m, true);
new validator(Matrix.isEqualTo(
  Matrix.LL(
    Matrix.copy(a),
  ),
  l,
)).describe("The LL Cholesky factorization method has to:")
  .test({ title: true, success: "green", error: "red" })
  .isSame(true)
  .describe(
    "1. return the correct output for positive defined symmetric matrices.",
  )
  .test();

new validator(callLL)
  .throwsErrorWith(Matrix.random(3, 3))
  .describe("2. throw error when the matrix is non symmetric.")
  .test();

new validator(callLL)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .and.throwsErrorWith("this throws")
  .describe("3. throw error when the matrix parameter is incorrectly defined.")
  .test();
