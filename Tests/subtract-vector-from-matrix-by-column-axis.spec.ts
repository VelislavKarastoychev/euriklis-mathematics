"use strict";
import { Matrix } from "../src";
import validator from "@euriklis/validator-ts";
import type { Integer, MatrixType, NumericMatrix } from "../src/Types";
const r1 = Matrix.uniqueRandom(5, 9);
const v1 = Matrix.uniqueRandom(1, 9);
const r2 = Matrix.copy(r1, "generic") as NumericMatrix;
const v2 = Matrix.transpose(v1);
const subtractVectorFromMatrixByColAxisInRowMode = r2.map(
  (row: number[]) => {
    return row.map((el: number, i: Integer) => el - v1[0][i]);
  },
);

const subtractVectorFromMatrixByColAxisInColumnMode = r2.map(
  (row: number[]) => {
    return row.map((el: number, i: Integer) => el - v2[i][0]);
  },
);

const callSubtractVectorFromMatrixByColumnAxis = (
  m: MatrixType | NumericMatrix,
  v: MatrixType | NumericMatrix,
): MatrixType | NumericMatrix =>
  Matrix.subtractVectorFromMatrixByColumnAxis(m, v);

new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.subtractVectorFromMatrixByColumnAxis(r1, v1),
      subtractVectorFromMatrixByColAxisInRowMode,
    ),
  ) <= 1e-8,
).describe("The subtractVectorFromMatrixByColumnAxis method has to:")
  .test({ title: true, success: "green", error: "red" })
  .isSame(true)
  .describe(
    "1. obtain the correct result and to assume the vector parameter as row vector by default.",
  )
  .test();

new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.subtractVectorFromMatrixByColumnAxis(r1, v2, undefined, "column"),
      subtractVectorFromMatrixByColAxisInColumnMode,
    ),
  ) <= 1e-8,
).describe(
  "2. obtain the correct result when the vector parameter is a column vector and mode is set to 'column'",
).isSame(true)
  .test();
new validator(callSubtractVectorFromMatrixByColumnAxis)
  .throwsErrorWith(Matrix.random(7, 8), Matrix.random(1, 3))
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]], Matrix.random(1, 3))
  .describe(
    "3. throws error when the matrix or vector parameter is incorrectly defined.",
  )
  .test();
