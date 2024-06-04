"use strict";
import { Matrix } from "../src";
import validator from "@euriklis/validator-ts";
import type { Integer, MatrixType, NumericMatrix } from "../src/Types";
const r1 = Matrix.uniqueRandom(7, 9);
const r2 = Matrix.copy(r1, "generic") as NumericMatrix;
const v1 = Matrix.uniqueRandom(1, 9);
const v2 = Matrix.transpose(v1);
const pointwiseDivideMatrixWithVectorByColumnAxisInRowMode = r2.map(
  (row: number[]) => {
    return row.map((el: number, i: Integer) => el / v1[0][i]);
  },
);
const pointwiseDivideMatrixWithVectorByColumnAxisInColumnMode = r2.map(
  (row: number[]) => {
    return row.map((el: number, i: Integer) => el / v2[i][0]);
  },
);

const callPointwiseDivideMatrixWithVectorByColumnAxis = (
  m: MatrixType | NumericMatrix,
  v: MatrixType | NumericMatrix,
): MatrixType | NumericMatrix =>
  Matrix.pointwiseDivideMatrixWithVectorByColumnAxis(m, v);

new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.pointwiseDivideMatrixWithVectorByColumnAxis(r1, v1),
      pointwiseDivideMatrixWithVectorByColumnAxisInRowMode,
    ),
  ) <= 1e-8,
).describe("The pointwiseDivideMatrixWithVectorByColumnAxis method has to:")
  .test({ title: true, success: "green", error: "red" })
  .isSame(true)
  .describe(
    "1. obtain the correct result and to assume the vector as row vector by default.",
  )
  .test();

new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.pointwiseDivideMatrixWithVectorByColumnAxis(
        r1,
        v2,
        undefined,
        "column",
      ),
      pointwiseDivideMatrixWithVectorByColumnAxisInColumnMode,
    ),
  ) <= 1e-8,
).describe(
  "2. obtain the correct result when the vector parameter is a column vector.",
).isSame(true)
  .test();

new validator(callPointwiseDivideMatrixWithVectorByColumnAxis)
  .throwsErrorWith(Matrix.random(3, 9), Matrix.random(1, 5))
  .and.throwsErrorWith([[1, 2, 3], [1, 23], [123]], Matrix.random(1, 3))
  .and.throwsErrorWith("it will throw", "it will throw")
  .describe(
    "3. throw error when the matrix or vector parameter are incorrectly defined.",
  )
  .test();
