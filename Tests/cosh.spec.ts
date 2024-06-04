"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import type { MatrixType, NumericMatrix } from "../src/Types";

const r = Matrix.random(3, 4);
const cosh = (Matrix.copy(r, "generic") as NumericMatrix).map((r: number[]) =>
  r.map((c: number) => Math.cosh(c))
);
const coshWeighted = (Matrix.copy(r, "generic") as NumericMatrix).map((
  r: number[],
) => r.map((c: number) => Math.cosh(2 * c + 3)));

const callCosh = (m: MatrixType | NumericMatrix): MatrixType | NumericMatrix =>
  Matrix.cosh(m);
new validator(Matrix.isEqualTo(Matrix.cosh(r), cosh))
  .describe("The cosh method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe("1. return the correct result without method parameters")
  .test();

new validator(Matrix.isEqualTo(Matrix.cosh(r, 2, 3), coshWeighted))
  .isSame(true)
  .describe("2. return the correct result when the method has parameters.")
  .test();

new validator(callCosh)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .and.throwsErrorWith("this throws")
  .describe("3. throw error when the matrix is incorrectly defined.")
  .test();
