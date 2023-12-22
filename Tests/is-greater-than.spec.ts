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
  ).test()
  .and.bind(
    new validator(a1.isGreaterThan(a3)).isSame(false),
  ).describe(
    "2. return false, when the current Matrix instance and the method parameter matrix have distinct dimension.",
  )
  .test()
  .describe(
    "3. return false when the current Matrix instance and the method parameter are equals",
  )
  .and.bind(
    new validator(Matrix.random(4, 4).isGreaterThan(a3)).isSame(false),
  ).test()
  .describe(
    "4. Time performance of the isGreaterThan method for random matrices with dimension 5000 x 5000",
  ).test()
  .on(true, () => {
    const m1 = Matrix.random(5000, 5000, 1, 2);
    const m2 = Matrix.random(5000, 5000);
    const t = new validator(m1).benchmark((m) => m.isGreaterThan(m2));
    console.table(t);
  });
