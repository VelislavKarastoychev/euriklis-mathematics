"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import { NumericMatrix, MatrixType } from "../src/Matrix/types.ts";

const a1 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const a2 = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
];

const a3 = Matrix.random(4, 4);

new validator(Matrix.isGreaterThan(a1, a2))
  .describe("The isGreaterThan method has to:").test({
    title: true,
    success: "green",
    error: "red",
  })
  .isSame(true)
  .describe(
    "1. return true when all elements are greater than the method parameter elements.",
  ).test();
new validator(Matrix.isGreaterThan(a1, a3)).isSame(false)
  .describe(
    "2. return false, when the current Matrix instance and the method parameter matrix have distinct dimension.",
  )
  .test();

new validator(Matrix.isGreaterThan(Matrix.random(4, 4), a3)).isSame(false)
  .describe(
    "3. return false when the current Matrix instance and the method parameter are equals",
  )
  .test();

new validator(Matrix.isGreaterThan(Matrix.copy(a1, "float64"), a2)).isSame(true)
  .and.bind(
    new validator(
      Matrix.isGreaterThan(
        Matrix.copy(a1, "float32"),
        Matrix.copy(a2, "float32"),
      ),
    ).isSame(true),
  ).describe(
    "4. return the correct value when the matrices have different type.",
  )
  .test();
new validator((m: MatrixType | NumericMatrix) => Matrix.isGreaterThan(m, m))
  .throwsErrorWith([
    [1, 2, 3],
    [1, 23],
    [123],
  ]).describe(
    "5. throws error when some of the matrix parameters is not a table.",
  )
  .test();
