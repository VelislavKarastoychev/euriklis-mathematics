"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";

const a1 = new Matrix([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]);

const a2 = new Matrix([
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
]);

const a3 = Matrix.random(4, 4);

new validator(a1.isGreaterThan(a2))
  .describe("The isGreaterThan method has to:").test({
    title: true,
    success: "green",
    error: "red",
  })
  .isSame(true)
  .describe(
    "1. return true when all elements are greater than the method parameter elements.",
  ).test();
new validator(a1.isGreaterThan(a3)).isSame(false)
  .describe(
    "2. return false, when the current Matrix instance and the method parameter matrix have distinct dimension.",
  )
  .test();

new validator(Matrix.random(4, 4).isGreaterThan(a3)).isSame(false)
  .describe(
    "3. return false when the current Matrix instance and the method parameter are equals",
  )
  .test();

new validator(a1.isGreaterThan(a2.M)).isSame(true)
  .and.bind(
    new validator(a1.isGreaterThan(a2.data)).isSame(true),
  ).describe(
    "4. return the correct value when the matrices have different type.",
  )
  .test();
