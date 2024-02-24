"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types.ts";

const m1 = Matrix.random(2, 3);
const m2 = Matrix.random(2, 4);
const m3 = Matrix.random(3, 4);

new validator(Matrix.appendBlockRight(m1, m2, "generic")).forEvery((row) =>
  row.isNumberArray.and.hasLength(7)
)
  .describe("appendBlockRight method has to:").test({
    title: true,
    success: "green",
    error: "red",
  })
  .describe("1. Append two matrices.").test();
new validator(Matrix.appendBlockRight(m1, m2, "generic")).forEvery((row) =>
  row.isNumberArray.and.hasLength(7)
)
  .describe("2. Append matrix and numerix matrix.").test();
new validator(Matrix.appendBlockRight(m1, m2, "generic")).forEvery((row) =>
  row.isNumberArray.and.hasLength(7)
)
  .describe("3. Append matrix and typed matrix.").test();
new validator((m: MatrixType | NumericMatrix) => Matrix.appendBlockRight(m1, m))
  .throwsErrorWith(m3)
  .describe("4. Throw error when the block is with inappropriate size.").test();
new validator((m: MatrixType | NumericMatrix) => Matrix.appendBlockRight(m1, m))
  .not.throwsErrorWith([])
  .and.not.throwsErrorWith(undefined)
  .describe(
    "5. Not throw when the argument is empty array (matrix) or undefined but returns the same matrix.",
  ).test();
