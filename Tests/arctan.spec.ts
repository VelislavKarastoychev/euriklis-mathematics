"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import type { MatrixType, NumericMatrix } from "../src/Types";

const r = Matrix.random(3, 4);
const arctan = (Matrix.copy(r, "generic") as NumericMatrix).map((r: number[]) =>
  r.map((c: number) => Math.atan(c))
);
const arctanWeighted = (Matrix.copy(r, "generic") as NumericMatrix).map((
  r: number[],
) => r.map((c: number) => Math.atan(2 * c + 3)));
const callArcTan = (
  m: MatrixType | NumericMatrix,
): MatrixType | NumericMatrix => Matrix.arctan(m);

new validator(Matrix.isEqualTo(Matrix.arctan(r), arctan))
  .describe("The arctan method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe("1. return the correct result without method parameters")
  .test();

new validator(Matrix.isEqualTo(Matrix.arctan(r, 2, 3), arctanWeighted))
  .isSame(true)
  .describe("2. return the correct result when the method has parameters.")
  .test();

new validator(callArcTan)
  .throwsErrorWith([[1, 2, 3], [[1, 23]], [123]])
  .and.throwsErrorWith("this throws")
  .describe("3. throw error when the matrix parameter is incorrectly defined.")
  .test();
