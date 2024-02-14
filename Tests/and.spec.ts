"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types.ts";

const r = Matrix.random(3, 4, 1, 2);
const r2 = Matrix.random(3, 4, 3, 4);
const runAnd = (matrix: number | Matrix | MatrixType | NumericMatrix) =>
  Matrix.random(3, 4).and(matrix);
new validator(r.and(r2).isEqualTo(r2))
  .describe("The and method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe(
    "1. return the correct result when the method's parameter is a matrix.",
  )
  .test();

new validator(r.and(4).isEqualTo(Matrix.replicate(4, 3, 4)))
  .describe(
    "2. return the correct result when the method's parameter is a number.",
  )
  .isSame(true)
  .test();

new validator(r.and(r2.M).isEqualTo(r2.M))
  .and.bind(
    new validator(r.and(r2.data).isEqualTo(r2.data)),
  ).describe(
    "3. return the correct result when the method's parameter is a Matrix - like structure.",
  )
  .isSame(true)
  .test();

new validator(runAnd).throwsErrorWith(Matrix.random(1, 2))
  .describe(
    "4. throws error when the method's parameter is a matrix with inappropriate dimension.",
  )
  .test();
new validator(runAnd).throwsErrorWith([[12, 13]])
  .describe(
    "5. throws error when the method's parameter is a matrix - like structure with inappropriate size.",
  )
  .test();

new validator(runAnd).throwsErrorWith("this will throw an error")
  .describe(
    "6. throws error when the method's parameter is not number, Matrix or Matrix - like structure.",
  )
  .test();
