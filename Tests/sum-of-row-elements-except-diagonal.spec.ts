"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src";
import { MatrixType, NumericMatrix } from "../src/Matrix/types";

const r = Matrix.uniqueRandom(7, 13, 0, 10, "generic") as NumericMatrix;
const rs = [
  r.map((row: number[], i: number) => {
    let sum = 0;
    row.forEach((
      p: number,
      j: number,
    ) => sum += +(i !== j) * p);
    return sum;
  }),
];

const rs1 = r.map((row: number[], i: number) => {
  let sum = 0;
  row.forEach((
    p: number,
    j: number,
  ) => sum += +(i !== j) * p);
  return [sum];
});

const callSumOfRowElementsExceptDiagonal = (m: MatrixType | NumericMatrix) => Matrix.sumOfRowElementsExceptDiagonal(m);

new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.sumOfRowElementsExceptDiagonal(r),
      rs,
    ),
  ) < 1e-8,
).describe("The sumOfRowElementsExceprDiagonal method has to:")
  .test({ title: true, success: "green", error: "red" })
  .isSame(true)
  .describe("1. return the correct result as row vector by default.")
  .test();

new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.sumOfRowElementsExceptDiagonal(r, undefined, "column"),
      rs1,
    ),
  ) < 1e-8,
).describe(
  "2. return the correct result and as a column vector when the mode parameter is set to 'column'",
)
  .isSame(true)
  .test();

new validator(callSumOfRowElementsExceptDiagonal)
  .throwsErrorWith([[1, 2, 3], [1, 2], [123]])
  .describe("3. throws error when the matrix parameter is incorrectly defined.")
  .test();
