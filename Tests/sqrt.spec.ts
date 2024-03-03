"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types.ts";

const r = Matrix.random(3, 4);
const sqrt = (Matrix.copy(r, "generic") as NumericMatrix).map((r: number[]) =>
  r.map((c: number) => Math.sqrt(c))
);
const sqrtWeighted = (Matrix.copy(r, "generic") as NumericMatrix).map((
  r: number[],
) => r.map((c: number) => Math.sqrt(2 * c + 3)));
const callSqrt = (m: MatrixType | NumericMatrix): MatrixType | NumericMatrix =>
  Matrix.sqrt(m);

new validator(Matrix.isEqualTo(Matrix.sqrt(r), sqrt))
  .describe("The sqrt method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe("1. return the correct result without method parameters")
  .test();

new validator(Matrix.isEqualTo(Matrix.sqrt(r, 2, 3), sqrtWeighted))
  .isSame(true)
  .describe("2. return the correct result when the method has parameters.")
  .test();

new validator(callSqrt)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .and.throwsErrorWith("this throws")
  .and.throwsErrorWith([[-1, -2, -3], [-3, -4, -5]])
  .describe("3. throw error when the matrix parameter is incorrectly defined.")
  .test();
