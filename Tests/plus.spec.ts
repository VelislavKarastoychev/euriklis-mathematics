"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types";

const m = Matrix.replicate(1, 4, 5);
const onces = Matrix.replicate(1, 4, 5);
const twoes = Matrix.replicate(2, 4, 5);
const runPlus = (matrix: number | Matrix | MatrixType | NumericMatrix) =>
  Matrix.replicate(1, 4, 5).plus(matrix);

new validator(m.plus(onces).isEqualTo(twoes))
  .isSame(true)
  .describe("The plus method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).describe(
    "1. returns the correct result when the method's parameter is a Matrix."
  )
  .test();

new validator(m.plus(1).isEqualTo(twoes))
  .describe(
    "2. returns the correct result when the method's parameter is a number"
  )
  .isSame(true).test();

new validator(m.plus(onces.M).isEqualTo(twoes))
  .and.bind(
    new validator(m.plus(onces.data).isEqualTo(twoes))
  ).describe(
    "3. returns the correct result when the method's parameter is a Matrix - like structure."
  )
  .isSame(true).test();

new validator(runPlus).throwsErrorWith(Matrix.random(2, 2))
  .describe(
    "4. throws error when the method's parameter is a Matrix with inappropriate dimension."
  )
  .test();
new validator(runPlus).throwsErrorWith([[12, 13]])
  .describe(
    "5. throws error when the method's parameter is a Matrix - like structure with inappropriate size."
  )
  .test();
new validator(runPlus).throwsErrorWith("incorrect")
  .describe(
    "6. throws error when the method's parameter is not a number or Matrix or MatrixType or NumericMatrix."
  )
  .test();
