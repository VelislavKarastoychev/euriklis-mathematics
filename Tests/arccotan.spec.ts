"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types.ts";

const r = Matrix.random(3, 4);
const arccotan = (Matrix.copy(r, "generic") as NumericMatrix).map((
  r: number[],
) => r.map((c: number) => Math.PI / 2 - Math.atan(c)));
const arccotanWeighted = (Matrix.copy(r, "generic") as NumericMatrix).map((
  r: number[],
) => r.map((c: number) => Math.PI / 2 - Math.atan(2 * c + 3)));
const callArcCotan = (
  m: MatrixType | NumericMatrix,
): MatrixType | NumericMatrix => Matrix.arccotan(m);

new validator(Matrix.isEqualTo(Matrix.arccotan(r), arccotan))
  .describe("The arccotan method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe("1. return the correct result without method parameters")
  .test();

new validator(Matrix.isEqualTo(Matrix.arccotan(r, 2, 3), arccotanWeighted))
  .isSame(true)
  .describe("2. return the correct result when the method has parameters.")
  .test();

new validator(callArcCotan)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .and.throwsErrorWith("this throws")
  .describe("3. throw error when the matrix parameter is incorrectly defined.")
  .test();
