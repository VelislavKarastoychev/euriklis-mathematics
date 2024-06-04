"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import type { MatrixType, NumericMatrix } from "../src/Types";

const r = Matrix.random(3, 4);
const tanh = (Matrix.copy(r, "generic") as NumericMatrix).map((r: number[]) =>
  r.map((c: number) => Math.tanh(c))
);
const tanhWeighted = (Matrix.copy(r, "generic") as NumericMatrix).map((
  r: number[],
) => r.map((c: number) => Math.tanh(2 * c + 3)));

const callTanh = (m: MatrixType | NumericMatrix): MatrixType | NumericMatrix =>
  Matrix.tanh(m);
new validator(Matrix.isEqualTo(Matrix.tanh(r), tanh))
  .describe("The tanh method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe("1. return the correct result without method parameters")
  .test();

new validator(Matrix.isEqualTo(Matrix.tanh(r, 2, 3), tanhWeighted))
  .isSame(true)
  .describe("2. return the correct result when the method has parameters.")
  .test();

new validator(callTanh)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .and.throwsErrorWith("this throws")
  .describe("3. throw error when the matrix parameter is incorrectly defined.")
  .test();
