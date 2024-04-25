"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src";
import {
  Integer,
  MatrixType,
  NumericMatrix,
  NumericType,
} from "../src/Matrix/types";

const r1 = Matrix.uniqueRandom(7, 9);
const r2 = Matrix.copy(r1, "generic") as NumericMatrix;
const v1 = Matrix.uniqueRandom(1, 7);
const v2 = Matrix.transpose(v1);
let subtractRowVectorFromMatrixByRowAxis: number[][] | number[] = [];
let subtractColVectorFromMatrixByRowAxis: number[][] = [];

r2.forEach((row: number[], i: Integer) => {
  subtractRowVectorFromMatrixByRowAxis[i] = row.map((item: number) => {
    return item - v1[0][i];
  });
  subtractColVectorFromMatrixByRowAxis[i] = row.map((item: number) => {
    return item - v2[i][0];
  });
});

const callSubtractVectorFromMatrixByRowAxis = (
  m: MatrixType | NumericMatrix,
  v: MatrixType | NumericMatrix,
  type: NumericType = "float64",
  mode: "row" | "column" = "row",
) => Matrix.subtractVectorFromMatrixByRowAxis(m, v, type, mode);
new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.subtractVectorFromMatrixByRowAxis(r1, v1),
      subtractRowVectorFromMatrixByRowAxis as number[][],
    ),
  ) <= 1e-8,
).describe("The subtractVectorFromMatrixByRowAxis method has to:")
  .test({ title: true, success: "green", error: "red" })
  .isSame(true)
  .describe(
    "1. copmpute the correct output and to assume the vector parameter as a row vector by default.",
  )
  .test();

new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.subtractVectorFromMatrixByRowAxis(r1, v2, undefined, "column"),
      subtractColVectorFromMatrixByRowAxis,
    ),
  ) <= 1e-8,
).describe(
  "2. compute the correct output when the vector parameter is set to 'column'",
)
  .isSame(true)
  .test();

new validator(callSubtractVectorFromMatrixByRowAxis)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]], Matrix.random(1, 3))
  .and.throwsErrorWith(Matrix.random(3, 4), Matrix.random(1, 4))
  .and.throwsErrorWith(
    Matrix.random(3, 4),
    Matrix.random(4, 1),
    undefined,
    "column",
  )
  .and.throwsErrorWith("it throws", Matrix.random(1, 3))
  .and.not.throwsErrorWith(Matrix.random(3, 4), Matrix.random(1, 3))
  .and.not.throwsErrorWith(
    Matrix.random(3, 4),
    Matrix.random(3, 1),
    "float64",
    "column",
  )
  .describe(
    "3. throw error when the matrix or vector parameter are incorrectly defined.",
  )
  .test();
