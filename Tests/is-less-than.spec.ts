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
  .isSame(true)
  .and.bind(
    new validator(b.isLessThan(c)).isSame(false),
  ).describe("1. return the correct answer").test()
  .describe("2. return false when the matrices have distinct dimension.")
  .and.bind(
    new validator(a.isLessThan(new Matrix([[10000000]]))).isSame(false)
  ).test()
  .describe("3. Time performance of the isLessThan method for random Matrices with dimension 5000 x 5000").test()
  .on(true, () => {
    const m1 = Matrix.random(5000, 5000);
    const m2 = Matrix.random(5000, 5000, 1, 2);
    const t = new validator(m1).benchmark((m) => m.isLessThan(m2));
    console.table(t);
  });
  
