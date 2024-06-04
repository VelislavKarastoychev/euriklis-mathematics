"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import type { MatrixType, NumericMatrix } from "../src/Types";
const r = Matrix.random(3, 4);
const exp = (Matrix.copy(r, "generic") as NumericMatrix).map((r: number[]) =>
  r.map((c: number) => Math.exp(c))
);
const expWeighted = (Matrix.copy(r, "generic") as NumericMatrix).map((
  r: number[],
) => r.map((c: number) => Math.exp(2 * c + 3)));

const callExp = (m: MatrixType | NumericMatrix): MatrixType | NumericMatrix =>
  Matrix.exp(m);
new validator(Matrix.isEqualTo(Matrix.exp(r), exp))
  .describe("The exp method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe("1. return the correct result without method parameters")
  .test();

new validator(Matrix.isEqualTo(Matrix.exp(r, 2, 3), expWeighted))
  .isSame(true)
  .describe("2. return the correct result when the method has parameters.")
  .test();

new validator(callExp)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .and.throwsErrorWith("this throws")
  .describe("3. throw error when the matrix is incorrectly defined.")
  .test();
