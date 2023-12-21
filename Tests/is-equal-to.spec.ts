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
      .isSame(false)
  )
  .describe(
    "1. return the correct output for matrices with dimension less than 20 x 20",
  ).test()
  .and.bind(
    new validator(Matrix.random(201, 203, -1, 1).isEqualTo(Matrix.random(201, 203, -1, 1)))
      .isSame(true)
  ).and.bind(
    new validator(Matrix.random(203, 303).isEqualTo(Matrix.random(203, 303, 0, 1, "float32")))
      .isSame(false)
  )
  .describe("2. returns the correct output for larger matrices.").test()
  .and.bind(
    new validator(Matrix.identity(200).isEqualTo(Matrix.identity(201)))
      .isSame(false)
  ).describe("3. returns 'false' when the matrices have distinct dimension.").test()
  .describe("4. Time performance of isEqualTo method for random 5000 x 5000 matrices.").test()
  .on(true, () => {
    const rand = Matrix.random(5000, 5000);
    const rand1 = Matrix.random(5000, 5000);
    const t1 = new validator(rand).benchmark((m) => m.isEqualTo(rand1));
    console.table(t1)
  })
   
