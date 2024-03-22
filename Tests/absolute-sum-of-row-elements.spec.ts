"use strict";
import { Matrix } from "../src";
import { Integer, MatrixType, NumericMatrix } from "../src/Matrix/types";
import validator from "@euriklis/validator-ts";

const r1: NumericMatrix = Matrix.uniqueRandom(
  6,
  7,
  -1,
  1,
  "generic",
) as NumericMatrix;

const callAbsoluteSumOfRowElements = (m: MatrixType | NumericMatrix) =>
  Matrix.absoluteSumOfRowElements(m);
const rowsNorm1 = [r1.reduce((norm1: number[], row: number[], i: Integer) => {
  norm1[i] = row.reduce((sum: number, el: number) => sum += Math.abs(el), 0);
  return norm1;
}, [])];
const rowsNorm1AsColumn = r1.reduce(
  (norm1: number[][], row: number[], i: Integer) => {
    norm1[i] = [
      row.reduce((sum: number, el: number) => sum += Math.abs(el), 0),
    ];
    return norm1;
  },
  [],
);

new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.absoluteSumOfRowElements(r1),
      rowsNorm1,
    ),
  ) < 1e-8,
).describe("The absoluteSumOfRowElements method has to:")
  .test({ title: true, success: "green", error: "red" })
  .isSame(true)
  .describe(
    "1. return the correct result when the parameters are correctly defined.",
  )
  .test();

new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.absoluteSumOfRowElements(r1, undefined, "column"),
      rowsNorm1AsColumn,
    ),
  ) < 1e-8,
).describe(
  "2. return the correct result in column vector when the mode parameter is set to 'column'",
)
  .isSame(true)
  .test();
new validator(callAbsoluteSumOfRowElements)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .and.throwsErrorWith("it throws")
  .describe("3. thorw error when the matrix parameter is incorrectly defined.")
  .test();
