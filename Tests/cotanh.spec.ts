"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import type { MatrixType, NumericMatrix } from "../src/Types";

const r = Matrix.random(3, 4);
const cotanh = (Matrix.copy(r, "generic") as NumericMatrix).map((r: number[]) =>
  r.map((c: number) => 1 / Math.tanh(c))
);
const cotanhWeighted = (Matrix.copy(r, "generic") as NumericMatrix).map((
  r: number[],
) => r.map((c: number) => 1 / Math.tanh(2 * c + 3)));

const callCotanh = (
  m: MatrixType | NumericMatrix,
): MatrixType | NumericMatrix => Matrix.cotanh(m);
new validator(Matrix.isEqualTo(Matrix.cotanh(r), cotanh))
  .describe("The cotanh method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe("1. return the correct result without method parameters")
  .test();

new validator(Matrix.isEqualTo(Matrix.cotanh(r, 2, 3), cotanhWeighted))
  .isSame(true)
  .describe("2. return the correct result when the method has parameters.")
  .test();

new validator(callCotanh)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .and.throwsErrorWith("this throws")
  .describe("3. throw error when the matrix parameter is incorrectly defined.")
  .test();
