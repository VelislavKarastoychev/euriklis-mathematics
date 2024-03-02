"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types.ts";

const r = Matrix.random(3, 4);
const bneg = (Matrix.copy(r, "generic") as NumericMatrix).map((r: number[]) =>
  r.map((c: number) => ~c)
);
const bneg2 = (Matrix.copy(r, "generic") as NumericMatrix).map((r: number[]) =>
  r.map((c: number) => ~(2 * c))
);
const callBitwiseNegate = (matrix: MatrixType | NumericMatrix):
  | MatrixType
  | NumericMatrix => Matrix.bitwiseNegate(matrix);
new validator(Matrix.isEqualTo(Matrix.bitwiseNegate(r), bneg))
  .describe("The bitwiseNegate method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe(
    "1. return a matrix with the bitwise negated elements of the elements.",
  )
  .test();

new validator(Matrix.isEqualTo(Matrix.bitwiseNegate(r, 2), bneg2))
  .describe("2. return the correct result when a weight and bias are defined.")
  .isSame(true)
  .test();

new validator(callBitwiseNegate)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .and.throwsErrorWith("this throws")
  .describe("3. throw error when the matrix is incorrectly defined.")
  .test();
