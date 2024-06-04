"use strict";

import { Matrix } from "../src";
import validator from "@euriklis/validator-ts";
import type { MatrixType, NumericMatrix } from "../src/Types";

const r = Matrix.uniqueRandom(5, 7, 0, 2, "generic") as NumericMatrix;
const r1 = Matrix.uniqueRandom(7, 13, 0, 3, "generic") as NumericMatrix;
const rs = [
  r.map((el: number[]): number => el.reduce((a: number, b: number) => a + b)),
];
const rs1 = r1.map((
  el: number[],
): [number] => [el.reduce((a: number, b: number) => a + b)]);

const callSumOfRowElements = (m: MatrixType | NumericMatrix) =>
  Matrix.sumOfRowElements(m);

new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.sumOfRowElements(r),
      rs,
    ),
  ) < 1e-8,
).describe("The sumOfRowElements has to:")
  .test({ title: true, success: "green", error: "red" })
  .isSame(true)
  .describe(
    "1. Compute the correct values and to return a row vector by default.",
  )
  .test();

new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.sumOfRowElements(r1, undefined, "column"),
      rs1,
    ),
  ) < 1e-8,
).describe(
  "2. Compute the correct result and to produce a column vector when the mode is 'column'",
).isSame(true)
  .test();

new validator(callSumOfRowElements)
  .throwsErrorWith("this throws")
  .and.throwsErrorWith([[1, 2, 3], [1, 2], [123]])
  .describe("3. throw error when the matrix parameter is incorrectly defined.")
  .test();
