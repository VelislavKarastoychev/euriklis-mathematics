"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import type { MatrixType, NumericMatrix } from "../src/Types";
const r1 = Matrix.random(3, 4, 1, 5);
const r2 = Matrix.random(3, 4, 5, 10);
const result1 = [[6, 7, 5, 11], [7, 7, 7, 7], [5, 11, 11, 13]];
const result2 = [[3, 3, 3, 3], [3, 3, 3, 3], [3, 3, 3, 7]];
const runBitwiseOr = (matrix: number | MatrixType | NumericMatrix) =>
  Matrix.bitwiseOr(r1, matrix);

new validator(Matrix.isEqualTo(Matrix.bitwiseOr(r1, r2), result1))
  .describe("The bitwiseOr method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).describe(
    "1. return the correct result when the method's parameter is a Matrix.",
  )
  .isSame(true)
  .test();

new validator(
  Matrix.isEqualTo(Matrix.bitwiseOr(r1, Matrix.copy(r2, "generic")), result1),
)
  .and.bind(
    new validator(
      Matrix.isEqualTo(
        Matrix.bitwiseOr(r1, Matrix.copy(r2, "float64")),
        result2,
      ),
    ),
  ).describe(
    "2. return the correct result when the method's parameter is a Matrix - like structure.",
  )
  .isSame(true)
  .test();
new validator(Matrix.isEqualTo(Matrix.bitwiseOr(r1, 3), result2))
  .describe(
    "3. return the correct result when the method's parameter is a number.",
  )
  .isSame(true)
  .test();
new validator(runBitwiseOr).throwsErrorWith(Matrix.random(2, 2))
  .describe(
    "4. throws error when the method's parameter is a Matrix with inappropriate dimension.",
  )
  .test();
new validator(runBitwiseOr).throwsErrorWith([[12, 13]])
  .describe(
    "5. throws error when the method's parameter is a Matrix - like structure with inappropriate size.",
  )
  .test();

new validator(runBitwiseOr).throwsErrorWith("Incorrect parameter")
  .describe(
    "6. throws error when the method's parameter is not a number or Matrix or MatrixType or NumericMatrix.",
  )
  .test();
