"use strict";
import { Matrix } from "../src";
import { Integer, MatrixType, NumericMatrix } from "../src/Matrix/types";
import validator from "@euriklis/validator-ts";

const r1 = Matrix.uniqueRandom(7, 9);
const r2 = Matrix.copy(r1, "generic") as NumericMatrix;
const sumOfSquaresOfRowElementsAsRow = [r2.map((row: number[]) => {
  return row.reduce((accum: number, currentElement: number) => {
    accum += currentElement * currentElement;
    return accum;
  }, 0);
})];

const sumOfSquaresOfRowElementsAsColumn = r2.map(
  (row: number[]) => {
    return [row.reduce((accum: number, currentElement: number) => {
      accum += currentElement * currentElement;
      return accum;
    }, 0)];
  },
);

const callSumOfSquaresOfRowElements = (m: MatrixType | NumericMatrix) =>
  Matrix.sumOfSquaresOfRowElements(m);
new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.sumOfSquaresOfRowElements(r1),
      sumOfSquaresOfRowElementsAsRow,
    ),
  ) <= 1e-8,
).isSame(true)
  .describe("The sumOfSquaresOfRowElements method has to:")
  .test({ title: true, success: "green", error: "red" })
  .describe(
    "1. to calculate the correct result and to return a row vector by default.",
  ).test();

new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.sumOfSquaresOfRowElements(r1, undefined, "column"),
      sumOfSquaresOfRowElementsAsColumn,
    ),
  ) <= 1e-8,
).isSame(true)
  .describe(
    "2. to calculate the correct result as column vector when the 'mode' parameter is set to 'column'",
  )
  .test();
new validator(callSumOfSquaresOfRowElements)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .and.throwsErrorWith("it throws")
  .describe("3. throw error when the matrix parameter is incorrectly defined.")
  .test();
