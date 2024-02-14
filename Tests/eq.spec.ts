"use strict";

import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types";

const m = Matrix.random(4, 5);
const m1 = Matrix.random(4, 5);
const onces = Matrix.replicate(1, 4, 5);
const runEq = (matrix: number | Matrix | MatrixType | NumericMatrix) =>
  Matrix.random(4, 5).eq(matrix);
new validator(m.eq(m1).isEqualTo(onces))
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
new validator(onces.eq(1).isEqualTo(onces))
  .isSame(true)
  .describe(
    "2. return the correct result when the method parameter is a number.",
  )
  .test();
new validator(m1.eq(m.M).isEqualTo(onces))
  .and.bind(
    new validator(m.eq(m1.data).isEqualTo(onces)),
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
