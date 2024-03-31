"use strict";
import { Matrix } from "../src";
import validator from "@euriklis/validator-ts";
import { Integer, MatrixType, NumericMatrix } from "../src/Matrix/types";

const r1 = Matrix.uniqueRandom(5, 7, -10, 10, "generic") as NumericMatrix;
const v = Matrix.uniqueRandom(1, 5);
const v1 = Matrix.transpose(v);
const multiplyVector2MatrixByRowAxis = r1.map((row: number[], i: Integer) => {
  return row.map((el: number) => el * v[0][i]);
});

const callMultiplyVectorToMatrix = (
  m: MatrixType | NumericMatrix,
  v: MatrixType | NumericMatrix,
) => Matrix.pointwiseMultiplyMatrixWithVectorByRowAxis(m, v);
new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.pointwiseMultiplyMatrixWithVectorByRowAxis(r1, v),
      multiplyVector2MatrixByRowAxis,
    ),
  ) <= 1e-8,
).describe("The poitwiseMultiplyMatrixWithVectorByRowAxis method has to:")
  .test({ title: true, success: "green", error: "red" })
  .isSame(true)
  .describe(
    "1. compute the correct result and the vector to be assumed as row vector by default.",
  )
  .test();

new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.pointwiseMultiplyMatrixWithVectorByRowAxis(r1, v1, undefined, "column"),
      multiplyVector2MatrixByRowAxis,
    ),
  ) <= 1e-8,
).describe(
  "2. compute the correct result when the vector parameter is a column vector and the 'mode' is set to 'column'",
)
  .isSame(true)
  .test();

new validator(callMultiplyVectorToMatrix)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]], [[1, 1, 1]])
  .and.throwsErrorWith(Matrix.random(3, 3), [1, 2, 3])
  .and.throwsErrorWith(Matrix.random(3, 3), Matrix.random(4, 1))
  .and.throwsErrorWith(Matrix.random(3, 3), Matrix.random(1, 4))
  .and.not.throwsErrorWith(Matrix.random(3, 4), Matrix.random(1, 3))
  .describe(
    "3. throw error when the matrix or vector parameters are incorrectly defined!!!",
  )
  .test();
