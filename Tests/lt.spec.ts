"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types";

const m = Matrix.random(4, 5);
const onces = Matrix.replicate(1, 4, 5);
const runLt = (matrix: number | Matrix | NumericMatrix | MatrixType) =>
  Matrix.random(4, 5).lt(matrix);
new validator(m.lt(1).isEqualTo(onces))
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

new validator(m.lt(onces).isEqualTo(onces))
  .describe(
    "2. return the correct result when the method's parameter is a Matrix.",
  )
  .test();
new validator(m.lt(onces.M).isEqualTo(onces.M))
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
