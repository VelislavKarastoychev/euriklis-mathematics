"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types.ts";

const a = [
  [1, 2, 3],
  [4, 5, 6],
];

const b = [
  [2, 3, 4],
  [5, 6, 7],
];

const c = [
  [0, 1, 2],
  [3, 4, 15],
];

new validator(Matrix.isLessThan(a, b))
  .describe("The isLessThan method has to:").test({
    title: true,
    success: "green",
    error: "red",
  })
  .isSame(true);
new validator(Matrix.isLessThan(b, c)).isSame(false)
  .describe("1. return the correct answer").test();

new validator(Matrix.isLessThan(b, [[10000000]])).isSame(false)
  .describe("2. return false when the matrices have distinct dimension.")
  .test();

new validator(Matrix.isLessThan(a, Matrix.copy(b, "float32"))).isSame(true)
  .and.bind(
    new validator(Matrix.isLessThan(Matrix.copy(a, "float64"), b)).isSame(true),
  ).describe(
    "3. return the correct result when the matrices have different types.",
  )
  .test();

new validator((m: MatrixType | NumericMatrix) => Matrix.isLessThan(m, m))
  .throwsErrorWith([
    [1, 2, 3],
    [1, 23],
    [123],
  ]).describe("4. throws error when some of the matrices is not table.")
  .test();
