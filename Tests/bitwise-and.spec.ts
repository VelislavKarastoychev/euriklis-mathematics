"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import type { MatrixType, NumericMatrix } from "../src/Types";
const r1 = Matrix.random(3, 4, 4, 10);
const r2 = Matrix.random(3, 4, 1, 2);
const result = Matrix.zeros(3, 4);
result[2][3] = 1;
const result2 = [[2, 2, 0, 0], [2, 2, 2, 2], [0, 0, 0, 0]];
const runBitwiseAnd = (matrix: number | MatrixType | NumericMatrix) =>
  Matrix.bitwiseAnd(r1, matrix);
new validator(Matrix.isEqualTo(Matrix.bitwiseAnd(r1, r2), result))
  .describe("The bitwiseAnd method has to:")
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
  Matrix.isEqualTo(Matrix.bitwiseAnd(r1, Matrix.copy(r2, "generic")), result),
)
  .and.bind(
    new validator(Matrix.isEqualTo(Matrix.bitwiseAnd(r1, r2), result)),
  ).describe(
    "2. return the correct result when the method's parameter is a Matrix - like structure.",
  )
  .isSame(true)
  .test();

new validator(Matrix.isEqualTo(Matrix.bitwiseAnd(r1, 2), result2))
  .isSame(true)
  .describe(
    "3. return the correct result when the method's parameter is a number.",
  )
  .test();
new validator(runBitwiseAnd).throwsErrorWith(Matrix.random(2, 2))
  .describe(
    "4. throws error when the method's parameter is a Matrix with inappropriate dimension.",
  )
  .test();
new validator(runBitwiseAnd).throwsErrorWith([[12, 13]])
  .describe(
    "5. throws error when the method's parameter is a Matrix - like structure with inappropriate size.",
  )
  .test();
new validator(runBitwiseAnd).throwsErrorWith("incorrect parameter")
  .describe(
    "6. throws error when the method's parameter is not a number or Matrix or MatrixType or NumericMatrix",
  )
  .test();
