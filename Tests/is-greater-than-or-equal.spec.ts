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
  ).test()
  .and.bind(
    new validator(a3.isGreaterThanOrEqual(a2)).isSame(true),
  ).describe(
    "2. return true when the elements of the current Matrix instance are greater than the elements of the method parameter.",
  ).test()
  .and.bind(
    new validator(a4.isGreaterThanOrEqual(a5)).isSame(false),
  ).describe(
    "3. return false when the current Matrix instance and the method parameter have distinct dimension.",
  ).test()
  .describe(
    "4. Time performance of the isGreaterThanOrEqual method for random matrices with dimension 5000 x 5000",
  ).test()
  .on(true, () => {
    const m1 = Matrix.random(5000, 5000, 1, 2);
    const m2 = Matrix.random(5000, 5000);
    const t = new validator(m1).benchmark((m) => m.isGreaterThanOrEqual(m2));
    console.table(t);
  });
