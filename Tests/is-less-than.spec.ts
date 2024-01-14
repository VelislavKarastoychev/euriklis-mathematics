"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";

const a = new Matrix([
  [1, 2, 3],
  [4, 5, 6],
]);

const b = new Matrix([
  [2, 3, 4],
  [5, 6, 7],
]);

const c = new Matrix([
  [0, 1, 2],
  [3, 4, 15],
]);

new validator(a.isLessThan(b))
  .describe("The isLessThan method has to:").test({
    title: true,
    success: "green",
    error: "red",
  })
  .isSame(true);
new validator(b.isLessThan(c)).isSame(false)
  .describe("1. return the correct answer").test();

new validator(a.isLessThan(new Matrix([[10000000]]))).isSame(false)
  .describe("2. return false when the matrices have distinct dimension.")
  .test();

new validator(a.isLessThan(b.M)).isSame(true)
  .and.bind(
    new validator(a.isLessThan(b.data)).isSame(true),
  ).describe(
    "3. return the correct result when the matrices have different types.",
  )
  .test();
