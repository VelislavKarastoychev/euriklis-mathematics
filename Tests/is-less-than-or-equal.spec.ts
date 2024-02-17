"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";

const a1 = [[1, 2], [3, 4]];
const a2 = [[1, 2], [3, 4]];
const a3 = [[2, 3], [4, 5]];
const a4 = [[0, 2], [3, 4]];
const a5 = [[1, 2, 3], [4, 5, 6]];

new validator(Matrix.isLessThanOrEqual(a1, a2)).describe(
  "The method isLessThanOrEqual has to:",
).test({ title: true, success: "green", error: "red" })
  .isSame(true)
  .describe("1. return true if the matrices are equals.").test();

new validator(Matrix.isLessThanOrEqual(a1, a3)).isSame(true).describe(
  "2. return true when all elements are less than the method parameter matrix elements.",
).test();

new validator(Matrix.isLessThanOrEqual(a1, a4)).isSame(false)
  .describe(
    "3. return false when some element is not less than or equal to the corresponding element from the method parameter matrix.",
  ).test();

new validator(Matrix.isLessThanOrEqual(a1, a5)).isSame(false).describe(
  "4. return false when the current Matrix instance and the method parameter have distinct dimension.",
).test();

new validator(Matrix.isLessThanOrEqual(Matrix.copy(a1, "float64"), a2)).isSame(true)
  .and.bind(
    new validator(Matrix.isLessThanOrEqual(a1, Matrix.copy(a2, "float64"))).isSame(true),
  ).describe(
    "5. returns the correct answer when the matrices are from different types",
  ).test();

