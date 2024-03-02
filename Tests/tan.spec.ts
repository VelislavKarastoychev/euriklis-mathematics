"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types.ts";

const r = Matrix.random(3, 4);
const tan = (Matrix.copy(r, "generic") as NumericMatrix).map((r: number[]) =>
  r.map((c: number) => Math.tan(c))
);
const tanWeighted = (Matrix.copy(r, "generic") as NumericMatrix).map((
  r: number[],
) => r.map((c: number) => Math.tan(2 * c + 3)));

const callTan = (
  matrix: MatrixType | NumericMatrix,
): MatrixType | NumericMatrix => Matrix.tan(matrix);
new validator(Matrix.isEqualTo(Matrix.tan(r), tan))
  .describe("The tan method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe("1. return the correct result without method parameters")
  .test();

new validator(Matrix.isEqualTo(Matrix.tan(r, 2, 3), tanWeighted))
  .isSame(true)
  .describe("2. return the correct result when the method has parameters.")
  .test();

new validator(callTan)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .throwsErrorWith("this throws")
  .describe("3. throw error when the matrix is incorrectly defined.")
  .test();
