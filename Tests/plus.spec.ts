"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import type { MatrixType, NumericMatrix } from "../src/Types";

const m = Matrix.replicate(1, 4, 5);
const onces = Matrix.replicate(1, 4, 5);
const twoes = Matrix.replicate(2, 4, 5);
const runPlus = (matrix: number | MatrixType | NumericMatrix) =>
  Matrix.plus(Matrix.replicate(1, 4, 5), matrix);

new validator(Matrix.isEqualTo(Matrix.plus(m, onces), twoes))
  .isSame(true)
  .describe("The plus method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).describe(
    "1. return the correct result when the method's parameter is a Matrix.",
  )
  .test();

new validator(Matrix.isEqualTo(Matrix.plus(m, 1), twoes))
  .describe(
    "2. return the correct result when the method's parameter is a number",
  )
  .isSame(true).test();

new validator(
  Matrix.isEqualTo(Matrix.plus(m, Matrix.copy(onces, "generic")), twoes),
)
  .and.bind(
    new validator(
      Matrix.isEqualTo(Matrix.plus(m, Matrix.copy(onces, "float32")), twoes),
    ),
  ).describe(
    "3. return the correct result when the method's parameter is a Matrix - like structure.",
  )
  .isSame(true).test();

new validator(runPlus).throwsErrorWith(Matrix.random(2, 2))
  .describe(
    "4. throw error when the method's parameter is a Matrix with inappropriate dimension.",
  )
  .test();
new validator(runPlus).throwsErrorWith([[12, 13]])
  .describe(
    "5. throw error when the method's parameter is a Matrix - like structure with inappropriate size.",
  )
  .test();
new validator(runPlus).throwsErrorWith("incorrect")
  .describe(
    "6. throw error when the method's parameter is not a number or Matrix or MatrixType or NumericMatrix.",
  )
  .test();
