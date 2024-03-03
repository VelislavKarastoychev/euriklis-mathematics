"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types.ts";

const r = Matrix.random(3, 4);
const arcsin = (Matrix.copy(r, "generic") as NumericMatrix).map((r: number[]) =>
  r.map((c: number) => Math.asin(c))
);
const arcsinWeighted = (Matrix.copy(r, "generic") as NumericMatrix).map((
  r: number[],
) => r.map((c: number) => Math.asin(0.5 * c + 0.1)));

const callarcsin = (
  m: MatrixType | NumericMatrix,
): MatrixType | NumericMatrix => Matrix.arcsin(m);
new validator(Matrix.isEqualTo(Matrix.arcsin(r), arcsin))
  .describe("The arcsin method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe("1. return the correct result without method parameters")
  .test();

new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(Matrix.arcsin(r, 0.5, 0.1), arcsinWeighted),
  ),
)
  .isInRange(-1e-8, 1e-8)
  .describe("2. return the correct result when the method has parameters.")
  .test();

new validator(callarcsin)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .and.throwsErrorWith("this throws")
  .describe("3. throw error when the matrix parameter is incorrectly defined.")
  .test();
