"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types";

const m = Matrix.random(4, 5);
const m1 = new Matrix(
  Array.from({ length: 4 }).map((_) =>
    Array.from({ length: 5 }).map(Math.random)
  ),
);
const runNeq = (matrix: number | Matrix | MatrixType | NumericMatrix) =>
  Matrix.random(4, 5, -1, 1).neq(matrix);
const onces = Matrix.replicate(1, 4, 5);

new validator(m.neq(m1).isEqualTo(onces))
  .describe("The neq method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe(
    "1. return the correct result when the method's parameter is a Matrix.",
  )
  .test();

new validator(m.neq(m1.M).isEqualTo(onces.M))
  .and.bind(
    new validator(m.neq(m1.data).isEqualTo(onces.data)),
  ).describe(
    "2. return the correct result when the method's parameter is a Matrix - like structure.",
  )
  .isSame(true).test();

new validator(m1.neq(1).isEqualTo(onces))
  .and.bind(
    new validator(m.neq(1).isEqualTo(onces)),
  ).isSame(true)
  .describe(
    "3. return the correct result when the method's paramaeter is a number.",
  )
  .test();

new validator(runNeq).throwsErrorWith(Matrix.random(2, 3))
  .describe(
    "4. throws error when the method's parameter is a Matrix with inappropriate dimension.",
  )
  .test();
new validator(runNeq).throwsErrorWith([[12, 13]])
  .describe(
    "5. throws error when the method's parameter is a Matrix - like structure with inappropriate size.",
  )
  .test();
new validator(runNeq).throwsErrorWith("wrong param")
  .describe(
    "6. throws error when the method's parameter is a not a number or Matrix or NumericMatrix or MatrixType.",
  )
  .test();
