"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";

const a1 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
const a2 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
const a3 = new Matrix([[4, 5, 6], [7, 8, 9], [10, 11, 12]]);
const a4 = new Matrix([[1, 2, 3], [4, 5, 6]]);
const a5 = new Matrix([[1, 2], [3, 4], [5, 6]]);

new validator(a1.isGreaterThanOrEqual(a2))
  .describe("The isGreaterThanOrEqual method has to:").test({
    title: true,
    success: "green",
    error: "red",
  })
  .isSame(true).describe(
    "1. return true when the current Matrix instance and the method parameter are equal.",
  ).test();

new validator(a3.isGreaterThanOrEqual(a2)).isSame(true).describe(
  "2. return true when the elements of the current Matrix instance are greater than the elements of the method parameter.",
).test();

new validator(a4.isGreaterThanOrEqual(a5)).isSame(false)
  .describe(
    "3. return false when the current Matrix instance and the method parameter have distinct dimension.",
  ).test();

new validator(
  Matrix.random(2, 3, 1, 2).isGreaterThanOrEqual(Matrix.random(2, 3).M),
)
  .isSame(true)
  .and.bind(
    new validator(
      Matrix.random(2, 4, 2, 3).isGreaterThanOrEqual(
        Matrix.random(2, 4, 2, 3).data,
      ),
    ).isSame(true),
  ).describe(
    "4. return the correct value when the matrices are with the same dimension and different type.",
  )
  .test();
