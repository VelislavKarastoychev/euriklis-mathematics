"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types";

const m = Matrix.random(4, 5);
const m1 = Array.from({ length: 4 }).map((_) =>
  Array.from({ length: 5 }).map(Math.random)
);
const runNeq = (matrix: number | MatrixType | NumericMatrix) =>
  Matrix.neq(Matrix.random(4, 5, -1, 1), matrix);
const onces = Matrix.replicate(1, 4, 5);

new validator(Matrix.isEqualTo(Matrix.neq(m, m1), onces))
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

new validator(
  Matrix.isEqualTo(
    Matrix.neq(m, Matrix.copy(m1, "float32")),
    Matrix.copy(onces, "float32"),
  ),
)
  .and.bind(
    new validator(
      Matrix.isEqualTo(Matrix.neq(m, Matrix.copy(m1, "generic")), onces),
    ),
  ).describe(
    "2. return the correct result when the method's parameter is a Matrix - like structure.",
  )
  .isSame(true).test();

new validator(Matrix.isEqualTo(Matrix.neq(m1, 1), onces))
  .and.bind(
    new validator(Matrix.isEqualTo(Matrix.neq(m, 1), onces)),
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
