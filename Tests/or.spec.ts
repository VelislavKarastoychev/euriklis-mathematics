"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import type { MatrixType, NumericMatrix } from "../src/Types";

const r = Matrix.random(3, 4, 1, 2);
const r1 = Matrix.random(3, 4, 3, 4);
const runOr = (matrix: number | MatrixType | NumericMatrix) =>
  Matrix.or(r, matrix);

new validator(Matrix.isEqualTo(Matrix.or(r, r1), r))
  .describe("The or method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  })
  .isSame(true)
  .describe(
    "1. return the correct result when the method's parameter is a Matrix.",
  )
  .test();

new validator(Matrix.isEqualTo(Matrix.or(r, Matrix.copy(r1, "float32")), r))
  .and.bind(
    new validator(
      Matrix.isEqualTo(Matrix.or(r, Matrix.copy(r1, "float64")), r),
    ),
  ).describe(
    "2. return the correct result when the method's parameter is a Matrix - like structure.",
  )
  .isSame(true)
  .test();
new validator(Matrix.isEqualTo(Matrix.or(r, 2), r))
  .describe(
    "3. return the correct result when the method's parameter is a number.",
  )
  .isSame(true)
  .test();
new validator(runOr).throwsErrorWith(Matrix.random(1, 2))
  .describe(
    "4. throws error when the method's parameter is a Matrix with inappropriate dimension.",
  )
  .test();
new validator(runOr).throwsErrorWith([[12, 13]])
  .describe(
    "5. throws error when the method's parameter is a Matrix - like structure with inappropriate size.",
  )
  .test();

new validator(runOr).throwsErrorWith("incorrect parameter")
  .describe(
    "6. throws error when the method's parameter is not a number or Matrix or Matrix - like structure.",
  )
  .test();
