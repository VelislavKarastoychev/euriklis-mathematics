"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types.ts";

const r1 = Matrix.random(3, 4);
const zeros = Matrix.zeros(3, 4);
const callNegate = (matrix: MatrixType | NumericMatrix) =>
  Matrix.negate(matrix);
new validator(
  Matrix.isEqualTo(Matrix.plus(r1, Matrix.negate(r1)), zeros),
)
  .describe("The negate getter method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe(
    "1. return the correct result (the negative value of each element).",
  )
  .test();

new validator(
  Matrix.isEqualTo(
    Matrix.plus(
      Matrix.Hadamard(r1, 2),
      Matrix.negate(r1, 2),
    ),
    zeros,
  ),
)
  .isSame(true)
  .describe("2. return the correct result when weight and bias are defined.")
  .test();

new validator(callNegate)
  .throwsErrorWith([[1, 2, 3], [1, 23], [123]])
  .and.throwsErrorWith("this throws")
  .describe("3. throw error when the matrix parameter is incorrectly defined.")
  .test();
