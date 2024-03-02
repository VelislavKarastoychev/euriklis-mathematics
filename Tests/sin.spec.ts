"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types.ts";

const r = Matrix.random(3, 4);
const sin = (Matrix.copy(r, "generic") as NumericMatrix).map((r: number[]) =>
  r.map((c: number) => Math.sin(c))
);
const sinWeighted = (Matrix.copy(r, "generic") as NumericMatrix).map((
  r: number[],
) => r.map((c: number) => Math.sin(2 * c + 3)));

const callSin = (
  matrix: MatrixType | NumericMatrix,
): MatrixType | NumericMatrix => Matrix.sin(matrix);
new validator(Matrix.isEqualTo(Matrix.sin(r), sin))
  .describe("The sin method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe("1. return the correct result without method parameters")
  .test();

new validator(Matrix.isEqualTo(Matrix.sin(r, 2, 3), sinWeighted))
  .isSame(true)
  .describe("2. return the correct result when the method has parameters.")
  .test();

new validator(callSin)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .and.throwsErrorWith("this thorws")
  .describe("3. throws error when the matrix is incorrectly defined.")
  .test();
