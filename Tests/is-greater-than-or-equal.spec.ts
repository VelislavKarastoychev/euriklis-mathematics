"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import type { MatrixType, NumericMatrix } from "../src/Types";
const a1 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
const a2 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
const a3 = [[4, 5, 6], [7, 8, 9], [10, 11, 12]];
const a4 = [[1, 2, 3], [4, 5, 6]];
const a5 = [[1, 2], [3, 4], [5, 6]];

new validator(Matrix.isGreaterThanOrEqual(a1, a2))
  .describe("The isGreaterThanOrEqual method has to:").test({
    title: true,
    success: "green",
    error: "red",
  })
  .isSame(true).describe(
    "1. return true when the current Matrix instance and the method parameter are equal.",
  ).test();

new validator(Matrix.isGreaterThanOrEqual(a3, a2)).isSame(true).describe(
  "2. return true when the elements of the current Matrix instance are greater than the elements of the method parameter.",
).test();

new validator(Matrix.isGreaterThanOrEqual(a4, a5)).isSame(false)
  .describe(
    "3. return false when the current Matrix instance and the method parameter have distinct dimension.",
  ).test();

new validator(
  Matrix.isGreaterThanOrEqual(Matrix.random(2, 3, 1, 2), Matrix.random(2, 3)),
)
  .isSame(true)
  .and.bind(
    new validator(
      Matrix.isGreaterThanOrEqual(
        Matrix.random(2, 4, 2, 3),
        Matrix.random(2, 4, 2, 3, "generic"),
      ),
    ).isSame(true),
  ).describe(
    "4. return the correct value when the matrices are with the same dimension and different type.",
  )
  .test();
new validator((m: MatrixType | NumericMatrix) =>
  Matrix.isGreaterThanOrEqual(m, m)
)
  .throwsErrorWith([
    [1, 2, 3],
    [1, 23],
    [123],
  ]).describe("5. throws error when some of the matrices are not table.")
  .test();
