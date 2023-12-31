"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";

const a1 = new Matrix([[1, 2], [3, 4]]);
const a2 = new Matrix([[1, 2], [3, 4]]);
const a3 = new Matrix([[2, 3], [4, 5]]);
const a4 = new Matrix([[0, 2], [3, 4]]);
const a5 = new Matrix([[1, 2, 3], [4, 5, 6]]);

new validator(a1.isLessThanOrEqual(a2)).describe(
  "The method isLessThanOrEqual has to:",
).test({ title: true, success: "green", error: "red" })
  .isSame(true)
  .describe("1. return true if the matrices are equals.").test()
  .and.bind(
    new validator(a1.isLessThanOrEqual(a3)).isSame(true),
  ).describe(
    "2. return true when all elements are less than the method parameter matrix elements.",
  ).test()
  .and.bind(
    new validator(a1.isLessThanOrEqual(a4)).isSame(false),
  ).describe(
    "3. return false when some element is not less than or equal to the corresponding element from the method parameter matrix.",
  ).test()
  .and.bind(
    new validator(a1.isLessThanOrEqual(a5)).isSame(false),
  ).describe(
    "4. return false when the current Matrix instance and the method parameter have distinct dimension.",
  ).test()
  .describe(
    "5. Time performance of the isLessThanOrEqual method for random matrices with dimension 5000 x 5000",
  ).test()
  .on(true, () => {
    const m1 = Matrix.random(5000, 5000);
    const m2 = Matrix.random(5000, 5000, 1, 2, "float32");
    const t = new validator(m1).benchmark((m) => m.isLessThanOrEqual(m2));
    console.table(t);
  });
