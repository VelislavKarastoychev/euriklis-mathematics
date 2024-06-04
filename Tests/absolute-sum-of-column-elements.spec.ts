"use strict";
import { Matrix } from "../src";
import validator from "@euriklis/validator-ts";
import type { Integer, MatrixType, NumericMatrix } from "../src/Types";
const abs = Math.abs;
const r1 = Matrix.uniqueRandom(8, 7, -1, 1, "generic") as NumericMatrix;
const r2 = Matrix.copy(r1, "generic") as NumericMatrix;
const callAbsoluteSumOfColumnElements = (m: MatrixType | NumericMatrix) =>
  Matrix.absoluteSumOfColumnElements(m);
const absoluteSumOfColElements = new Array(r2[0].length).fill(0);
const absoluteSumOfColElementsAsColumn = absoluteSumOfColElements.map(
  (_) => [0]
);
r2.forEach((row: number[]) => {
  row.forEach((el: number, colIndex: Integer) => {
    absoluteSumOfColElements[colIndex] += abs(el);
    absoluteSumOfColElementsAsColumn[colIndex][0] += abs(el);
  });
});

new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.absoluteSumOfColumnElements(r1),
      [absoluteSumOfColElements],
    ),
  ) < 1e-8,
).describe("The absoluteSumOfColumnElements method has to:")
  .test({ title: true, success: "green", error: "red" })
  .isSame(true)
  .describe(
    "1. return the correct result as row vector when the matrix is correctly defined. Default behavior.",
  )
  .test();

new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.absoluteSumOfColumnElements(r1, undefined, "column"),
      absoluteSumOfColElementsAsColumn,
    ),
  ) < 1e-8,
).describe(
  "2. return the correct result as column vector when the mode parameter is set to 'column'.",
).isSame(true)
  .test();

new validator(callAbsoluteSumOfColumnElements)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .and.throwsErrorWith("it throws!!!")
  .describe("3. throw error when the matrix parameter is incorrectly defined.")
  .test();
