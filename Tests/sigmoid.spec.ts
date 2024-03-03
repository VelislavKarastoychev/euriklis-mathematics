"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types.ts";

const r = Matrix.random(3, 4);
const sigmoid = (Matrix.copy(r, "generic") as NumericMatrix).map((
  r: number[],
) => r.map((c: number) => 1 / (1 + Math.exp(-c))));
const sigmoidWeighted = (Matrix.copy(r, "generic") as NumericMatrix).map((
  r: number[],
) => r.map((c: number) => 1 / (1 + Math.exp(-(2 * c + 3)))));
const callSignoid = (
  m: MatrixType | NumericMatrix,
): MatrixType | NumericMatrix => Matrix.sigmoid(m);

new validator(Matrix.isEqualTo(Matrix.sigmoid(r), sigmoid))
  .describe("The sigmoid method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe("1. return the correct result without method parameters")
  .test();

new validator(Matrix.isEqualTo(Matrix.sigmoid(r, 2, 3), sigmoidWeighted))
  .isSame(true)
  .describe("2. return the correct result when the method has parameters.")
  .test();

new validator(callSignoid)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .and.throwsErrorWith("this throws")
  .describe("3. throw error when the matrix parameter is incorrectly defined.")
  .test();
