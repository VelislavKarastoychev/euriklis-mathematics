"use strict";
import { Matrix } from "../src";
import validator from "@euriklis/validator-ts";
import { Integer, MatrixType, NumericMatrix } from "../src/Matrix/types";

const r1 = Matrix.uniqueRandom(7, 9);
const r2 = Matrix.copy(r1, "generic") as NumericMatrix;
const v1 = Matrix.uniqueRandom(1, 9);
const v2 = Matrix.transpose(v1);

const pointwiseMultiplyMatrixWithVectorByColumnAxisInRowMode = r2.map(
  (row: number[]) => {
    return row.map((el: number, i: Integer) => el * v1[0][i]);
  },
);
const pointwiseMultiplyMatrixWithVectorByColumnAxisInColumnMode = r2.map(
  (row: number[]) => {
    return row.map((el: number, i: Integer) => el * v2[i][0]);
  },
);

const callPointwiseMultiplyMatrixWithVectorByColumnAxis = (
  m: MatrixType | NumericMatrix,
  v: MatrixType | NumericMatrix,
): MatrixType | NumericMatrix =>
  Matrix.pointwiseMultiplyMatrixWithVectorByColumnAxis(m, v);

new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.pointwiseMultiplyMatrixWithVectorByColumnAxis(r1, v1),
      pointwiseMultiplyMatrixWithVectorByColumnAxisInRowMode,
    ),
  ) <= 1e-8,
).describe("The pointwiseMultiplyMatrixWithVectorByColumnAxisMethod has to:")
  .test({ title: true, success: "green", error: "red" })
  .describe(
    "1. obtain the correct result and to assume the vector parameter as a row vector by default.",
  ).isSame(true)
  .test();

new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.pointwiseMultiplyMatrixWithVectorByColumnAxis(
        r1,
        v2,
        undefined,
        "column",
      ),
      pointwiseMultiplyMatrixWithVectorByColumnAxisInColumnMode,
    ),
  ) <= 1e-8,
).describe(
  "2. obtains the correct result when the vector parameter is a column vector and the mode is set to 'column'.",
).isSame(true)
  .test();

new validator(callPointwiseMultiplyMatrixWithVectorByColumnAxis)
  .throwsErrorWith(Matrix.random(3, 4), Matrix.random(1, 6))
  .and.throwsErrorWith([[1, 2, 3], [1, 23], [123]], Matrix.random(1, 3))
  .and.throwsErrorWith("it will throw", "it will throw!!!")
  .describe(
    "3. throw error when the matrix or vector parameters are incorrectly defined.",
  )
  .test();
