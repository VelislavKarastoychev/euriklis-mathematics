"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types.ts";

const r = Matrix.random(3, 4, 1, 2);
const r2 = Matrix.random(3, 4, 3, 4);
const runAnd = (matrix: number | MatrixType | NumericMatrix) =>
  Matrix.and(Matrix.random(3, 4), matrix);
new validator(Matrix.isEqualTo(Matrix.and(r, r2), r2))
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

new validator(Matrix.isEqualTo(Matrix.and(r, 4), Matrix.replicate(4, 3, 4)))
  .describe(
    "2. return the correct result when the method's parameter is a number.",
  )
  .isSame(true)
  .test();

new validator(
  Matrix.isEqualTo(
    Matrix.and(r, Matrix.copy(r2, "generic")),
    Matrix.copy(r2, "generic"),
  ),
)
  .and.bind(
    new validator(
      Matrix.isEqualTo(
        Matrix.and(r, Matrix.copy(r2, "float32")),
        Matrix.copy(r2, "float32"),
      ),
    ),
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
