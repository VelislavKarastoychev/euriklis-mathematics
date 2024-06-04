"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import type { MatrixType, NumericMatrix } from "../src/Types";

const m = Matrix.random(4, 5);
const onces = Matrix.replicate(1, 4, 5);
const runLt = (matrix: number | NumericMatrix | MatrixType) =>
  Matrix.lt(Matrix.random(4, 5), matrix);
new validator(Matrix.isEqualTo(Matrix.lt(m, 1), onces))
  .describe("The lt method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  })
  .describe(
    "1. return the correct result when the method's parameter is a number.",
  )
  .isSame(true)
  .test();

new validator(Matrix.isEqualTo(Matrix.lt(m, onces), onces))
  .describe(
    "2. return the correct result when the method's parameter is a Matrix.",
  )
  .test();
new validator(
  Matrix.isEqualTo(Matrix.lt(m, Matrix.copy(onces, "float32")), onces),
)
  .describe(
    "3. returns the correct result when the method's parameter is a Matrix - like structure.",
  )
  .test();
new validator(runLt).throwsErrorWith(Matrix.replicate(2, 5, 4))
  .describe(
    "4. throws error when the method's parameter is a Matrix with inappropriate dimension.",
  )
  .test();
new validator(runLt).throwsErrorWith([[12, 13]])
  .describe(
    "5. throws error when the method's parameter is a Matrix - like structure with inapproprient size.",
  )
  .test();

new validator(runLt).throwsErrorWith("trewq")
  .describe(
    "6. throws error when the method's parameter is not a number or Matrix or Matrix type or numeric matrix.",
  )
  .test();
