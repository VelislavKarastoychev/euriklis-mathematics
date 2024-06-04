"use strict";
import { Matrix } from "../src";
import validator from "@euriklis/validator-ts";
import type { MatrixType, NumericMatrix } from "../src/Types";

const r1 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
const r2 = [
  [11, 13, 15],
  [14, 16, 18],
  [17, 19, 21],
];
const v1 = [[10, 11, 12]];
const v2 = Matrix.transpose(v1);
const callAddVectorToMatrixByColumnAxis = (
  m: MatrixType | NumericMatrix,
  v: MatrixType | NumericMatrix,
): MatrixType | NumericMatrix => Matrix.addVectorToMatrixByColumnAxis(m, v);
new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.addVectorToMatrixByColumnAxis(r1, v1),
      r2,
    ),
  ) <= 1e-8,
).isSame(true)
  .describe("The addVectorToMatrixByColumnMatrix method has to:")
  .test({ title: true, success: "green", error: "red" })
  .describe(
    "1. obtain the correct result and assume the vector parameter as a row vector by default.",
  )
  .test();

new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.addVectorToMatrixByColumnAxis(r1, v2, undefined, "column"),
      r2,
    ),
  ) <= 1e-8,
).describe(
  "2. obtains the correct result when the vector parameter is a row vector and the mode is set to 'column'",
)
  .isSame(true)
  .test();

new validator(callAddVectorToMatrixByColumnAxis)
  .throwsErrorWith(Matrix.random(3, 3), Matrix.random(1, 2))
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]], Matrix.random(1, 3))
  .throwsErrorWith("it throws!!!", Matrix.random(1, 2))
  .describe(
    "3. throws error when the matrix and vector parameters are inappropriately defined.",
  )
  .test();
