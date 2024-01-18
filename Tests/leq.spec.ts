"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types";


const m = Matrix.random(4, 5);
const onces = Matrix.replicate(1, 4, 5);
const runLeq = (matrix: number | Matrix | MatrixType | NumericMatrix) =>
  Matrix.random(4, 5).leq(matrix);
new validator(m.leq(onces).isEqualTo(onces))
  .describe("The leq method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe(
    "1. return the correct result when the method's parameter is a Matrix.",
  )
  .test();
new validator(m.leq(1).isEqualTo(onces))
  .isSame(true)
  .describe(
    "2. return the correct result when the method's parameter is a number.",
  )
  .test();
new validator(m.leq(onces.M).isEqualTo(onces))
  .and.bind(
    new validator(m.leq(onces.data).isEqualTo(onces)),
  ).isSame(true)
  .describe(
    "3. returns the correct result when the method's parameter is a Matrix - like structure.",
  )
  .test();
new validator(runLeq).throwsErrorWith(Matrix.random(2, 3))
  .describe(
    "4. throws error when the method's parameter is a Matrix with inappropriate dimension.",
  )
  .test();
new validator(runLeq).throwsErrorWith([[12, 13]])
  .describe(
    "5. throws error when the method's parameter is a Matrix - like structure with inappropriate size.",
  )
  .test();
new validator(runLeq).throwsErrorWith("this is not matrix")
  .describe("6. throws error when the method's parameter is not number or Matrix or TypedMatrix or NumericMatrix.")
  .test();
