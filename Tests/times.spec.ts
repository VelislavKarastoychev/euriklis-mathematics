"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src";
import type { MatrixType, NumericMatrix } from "../src/Types";

const onces34 = Matrix.replicate(1, 3, 4);
const onces42 = Matrix.replicate(1, 4, 2);
const fours32 = Matrix.replicate(4, 3, 2);
const callTimes = (m: MatrixType | NumericMatrix) =>
  Matrix.times(Matrix.random(5, 8), m);
new validator(Matrix.isEqualTo(
  Matrix.times(onces34, onces42),
  fours32,
)).describe("The times method has to:")
  .test({ title: true, success: "green", error: "red" })
  .isSame(true)
  .describe("1. provide the correct results for small matrices.")
  .test();

new validator(Matrix.isEqualTo(
  Matrix.times(
    Matrix.replicate(1, 500, 500),
    Matrix.replicate(1, 500, 400),
  ),
  Matrix.replicate(500, 500, 400),
)).isSame(true)
  .describe("2. provide the correct result for matrices with big size.")
  .test();

new validator(Matrix.isEqualTo(
  Matrix.times(
    Matrix.random(40, 60),
    2,
  ),
  Matrix.Hadamard(
    Matrix.random(40, 60),
    2,
  ),
)).isSame(true)
  .describe("3. provide the correct result for matrix and number.")
  .test();

new validator(Matrix.isEqualTo(
  Matrix.times(Matrix.random(40, 60), [[Math.PI]]),
  Matrix.Hadamard(
    Matrix.random(40, 60),
    Math.PI,
  ),
)).isSame(true)
  .describe(
    "4. provide the correct result for multiplication of matrix and 1 x 1 matrix.",
  )
  .test();

new validator(Matrix.isEqualTo(
  Matrix.times(5, 6),
  [[30]],
)).describe(
  "5. provide the correct result when the arguments of the times method are numbers.",
)
  .isSame(true)
  .test();

new validator(Matrix.isEqualTo(
  Matrix.times(
    Matrix.replicate(2, 70, 1),
    Matrix.replicate(1, 1, 70),
  ),
  Matrix.replicate(2, 70, 70),
)).describe(
  "6. provide the correct result for multiplication of row vector with column vector.",
)
  .isSame(true)
  .test();

new validator(Matrix.isEqualTo(
  Matrix.times(7, Matrix.random(60, 70)),
  Matrix.Hadamard(Matrix.random(60, 70), 7),
)).describe(
  "7. provide the correct result for arguments of times which are number and Matrix.",
)
  .isSame(true)
  .test();

new validator(Matrix.isEqualTo(
  Matrix.times([[7]], Matrix.random(60, 70)),
  Matrix.Hadamard(Matrix.random(60, 70), 7),
)).describe(
  "8. provide the correct result for arguments of times which are matrix with dimensions 1 x 1 and Matrix.",
)
  .isSame(true)
  .test();
new validator(callTimes)
  .throwsErrorWith([[1, 3]])
  .and.throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .and.throwsErrorWith("this throws")
  .describe(
    "9. throw error when the matrix parameters are inappropriately or incorrectly defined.",
  )
  .test();
