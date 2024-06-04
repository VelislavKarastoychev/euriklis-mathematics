"use strict";

import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import type { MatrixType, NumericMatrix } from "../src/Types";

const m = Matrix.random(4, 5);
const m1 = Matrix.random(4, 5);
const onces = Matrix.replicate(1, 4, 5);
const runEq = (matrix: number | MatrixType | NumericMatrix) =>
  Matrix.eq(Matrix.random(4, 5), matrix);
new validator(Matrix.isEqualTo(Matrix.eq(m, m1), onces))
  .describe("The eq method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe(
    "1. return the correct result when the method parameter is a Matrix instance.",
  )
  .test();
new validator(Matrix.isEqualTo(Matrix.eq(onces, 1), onces))
  .isSame(true)
  .describe(
    "2. return the correct result when the method parameter is a number.",
  )
  .test();
new validator(Matrix.isEqualTo(Matrix.eq(m1, Matrix.copy(m)), onces))
  .and.bind(
    new validator(
      Matrix.isEqualTo(Matrix.eq(Matrix.copy(m, "generic"), m1), onces),
    ),
  ).isSame(true)
  .describe(
    "3. return the correct result when the argument is a numeric matrix or a typed matrix structure.",
  )
  .test();

new validator(runEq).throwsErrorWith([[12, 13]])
  .describe(
    "4. throws error when the method parameter is inappropriate Matrix - like structure.",
  )
  .test();

new validator(runEq).throwsErrorWith(Matrix.random(5, 4))
  .describe(
    "5. throws error when the method parameter is a matrix with inappropriate dimension.",
  )
  .test();

new validator(runEq).throwsErrorWith("qwert")
  .describe(
    "6. throws error when the method's parameter is not number or Matrix or Matrix - like structure.",
  )
  .test();
