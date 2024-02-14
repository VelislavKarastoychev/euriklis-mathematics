"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types.ts";

const r = Matrix.random(3, 4, 1, 2);
const r1 = Matrix.random(3, 4, 3, 4);
const runOr = (matrix: number | Matrix | MatrixType | NumericMatrix) =>
  r.or(matrix);

new validator(r.or(r1).isEqualTo(r))
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

new validator(r.or(r1.M).isEqualTo(r.data))
  .and.bind(
    new validator(r.or(r1.data).isEqualTo(r)),
  ).describe(
    "2. return the correct result when the method's parameter is a Matrix - like structure.",
  )
  .isSame(true)
  .test();
new validator(r.or(2).isEqualTo(r))
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
