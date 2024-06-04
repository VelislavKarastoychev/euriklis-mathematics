"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import type { MatrixType, NumericMatrix } from "../src/Types";

const matrix1 = Matrix.random(10, 11);
const matrix2 = Matrix.random(10, 11);

new validator(Matrix.isEqualTo(matrix1, matrix2))
  .describe("The isEqualsTo method has to:")
  .test({ title: true, success: "green", error: "red" })
  .isSame(true)
  .and.bind(
    new validator(Matrix.isEqualTo(matrix1, Matrix.identityLike(10, 11)))
      .isSame(false),
  )
  .describe(
    "1. return the correct output for matrices with dimension less than 20 x 20",
  ).test();
new validator(
  Matrix.isEqualTo(
    Matrix.random(201, 203, -1, 1),
    Matrix.random(201, 203, -1, 1),
  ),
)
  .isSame(true).and.bind(
    new validator(
      Matrix.isEqualTo(
        Matrix.random(203, 303),
        Matrix.random(203, 303, 0, 1, "float32"),
      ),
    )
      .isSame(false),
  )
  .describe("2. returns the correct output for larger matrices.").test();
new validator(Matrix.isEqualTo(Matrix.identity(200), Matrix.identity(201)))
  .isSame(false)
  .describe(
    "3. returns 'false' when the matrices have distinct dimension.",
  )
  .test();
new validator(Matrix.isEqualTo(
  Matrix.random(2, 3),
  Matrix.random(2, 3),
))
  .isSame(true)
  .and.bind(
    new validator(Matrix.isEqualTo(
      Matrix.random(40, 31),
      Matrix.random(40, 31),
    ))
      .isSame(true),
  )
  .describe(
    "4. return the correct output when the matrices have different type.",
  )
  .test();
new validator((m: MatrixType | NumericMatrix) => Matrix.isEqualTo(m, m))
  .throwsErrorWith([
    [1, 2, 3],
    [1, 23],
    [123],
  ]).describe("5. throws error when the matrices are not tables.")
  .test();
