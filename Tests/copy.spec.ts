"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src";

const r1 = Matrix.random(3, 4);
const r2 = Matrix.copy(r1);
new validator(Matrix.isEqualTo(r1, r2))
  .isSame(true)
  .describe("The copy method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).describe("1. copies the initial matrix.")
  .test();

new validator(Matrix.isEqualTo(r2, Matrix.copy(r1, "float64", 2, 1)))
  .isSame(false)
  .describe("2. be immutable with respect to the initial matrix.")
  .test();


new validator(
  Matrix.isEqualTo(
    Matrix.copy(Matrix.replicate(2, 3, 4), undefined, 2, 1),
    Matrix.replicate(5, 3, 4),
  ),
).isSame(true)
.describe("3. transform linearly the elements of the matrix if weight and bias parameters are specified.")
.test();
