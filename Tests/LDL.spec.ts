"use strict";
import { Matrix } from "../src";
import validator from "@euriklis/validator-ts";
import type { MatrixType, NumericMatrix } from "../src/Types";

const a = [
  [4, 12, -16],
  [12, 37, -43],
  [-16, -43, 98],
];
const l = [
  [1, 0, 0],
  [3, 1, 0],
  [-4, 5, 1],
];
const d = [[4, 1, 9]];
const LDL = Matrix.LDL(a);
const callLDL = (
  m: MatrixType | NumericMatrix,
): { L: MatrixType | NumericMatrix; D: MatrixType | NumericMatrix } =>
  Matrix.LDL(m);
new validator(Matrix.isEqualTo(LDL.L, l))
  .and.bind(
    new validator(Matrix.isEqualTo(LDL.D, d)).isSame(true),
  ).isSame(true)
  .describe("The LDL method has to:")
  .test({ title: true, success: "green", error: "red" })
  .describe("1. produce the correct answer for when the matrix is sqare.")
  .test();

new validator(callLDL)
  .throwsErrorWith([[1, 2, 3], [4, 5, 6]])
  .describe("2. throw error when the matrix parameter is not a square matrix.")
  .test();

new validator(callLDL)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .and.throwsErrorWith("this will throw")
  .describe("3. throw error when the matrix parameter is incorrectly declared.")
  .test();
