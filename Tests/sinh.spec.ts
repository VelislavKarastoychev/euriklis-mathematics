"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import type { MatrixType, NumericMatrix } from "../src/Types";
const r = Matrix.random(3, 4);
const sinh = (Matrix.copy(r, "generic") as NumericMatrix).map((r: number[]) =>
  r.map((c: number) => Math.sinh(c))
);
const sinhWeighted = (Matrix.copy(r, "generic") as NumericMatrix).map((
  r: number[],
) => r.map((c: number) => Math.sinh(2 * c + 3)));

const callSinh = (m: MatrixType | NumericMatrix): MatrixType | NumericMatrix =>
  Matrix.sinh(m);
new validator(Matrix.FrobeniusNorm(Matrix.minus(Matrix.sinh(r), sinh)))
  .describe("The sinh method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isInRange(-1e-8, 1e-8)
  .describe("1. return the correct result without method parameters")
  .test();

new validator(
  Matrix.FrobeniusNorm(Matrix.minus(Matrix.sinh(r, 2, 3), sinhWeighted)),
)
  .isInRange(-1e-8, 1e8)
  .describe("2. return the correct result when the method has parameters.")
  .test();

new validator(callSinh)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .and.throwsErrorWith("this throws")
  .describe("3. throw error when the matrix parameter is incorrectly defined.")
  .test();
