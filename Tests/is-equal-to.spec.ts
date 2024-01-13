"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";

const matrix1 = Matrix.random(10, 11);
const matrix2 = Matrix.random(10, 11);

new validator(matrix1.isEqualTo(matrix2))
  .describe("The isEqualsTo method has to:")
  .test({ title: true, success: "green", error: "red" })
  .isSame(true)
  .and.bind(
    new validator(matrix1.isEqualTo(Matrix.identityLike(10, 11)))
      .isSame(false),
  )
  .describe(
    "1. return the correct output for matrices with dimension less than 20 x 20",
  ).test();
new validator(
  Matrix.random(201, 203, -1, 1).isEqualTo(Matrix.random(201, 203, -1, 1)),
)
  .isSame(true).and.bind(
    new validator(
      Matrix.random(203, 303).isEqualTo(
        Matrix.random(203, 303, 0, 1, "float32"),
      ),
    )
      .isSame(false),
  )
  .describe("2. returns the correct output for larger matrices.").test();
new validator(Matrix.identity(200).isEqualTo(Matrix.identity(201)))
  .isSame(false)
  .describe(
    "3. returns 'false' when the matrices have distinct dimension.",
  )
  .test();
new validator(Matrix.random(2, 3).isEqualTo(Matrix.random(2, 3).M))
  .isSame(true)
  .and.bind(
    new validator(Matrix.random(40, 31).isEqualTo(Matrix.random(40, 31).data)).isSame(true)
  )
  .describe("4. return the correct output when the matrices have different type.")
  .test();
