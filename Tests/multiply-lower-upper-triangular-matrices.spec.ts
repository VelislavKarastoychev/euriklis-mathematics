"use strict";

import { Matrix } from "../src";
import validator from "@euriklis/validator-ts";

const a = [
  [Math.random(), 0, 0, 0, 0],
  [Math.random(), Math.random(), 0, 0, 0],
  [Math.random(), Math.random(), Math.random(), 0, 0],
  [Math.random(), Math.random(), Math.random(), Math.random(), 0],
  [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
];

const b = [
  [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
  [0, Math.random(), Math.random(), Math.random(), Math.random()],
  [0, 0, Math.random(), Math.random(), Math.random()],
  [0, 0, 0, Math.random(), Math.random()],
  [0, 0, 0, 0, Math.random()],
];


// console.table(Matrix.multiplyLU(a, b));
// console.table(Matrix.times(a, b));
// console.table(numeric.dot(a, b))

new validator(Matrix.FrobeniusNorm(
  Matrix.minus(
    Matrix.multiplyLU(a, b),
    Matrix.times(a, b),
  ),
)).isInRange(-1e-8, 1e-8)
  .on(false, (v) => console.log(v.value))
  .describe("The multiplyLU method has to:")
  .test({ title: true, success: "green", error: "red" })
  .describe(
    "1. return the correct result when the first matrix paraemter is lower triangular matrix and the second is upper triangular matrix.",
  ).test();
