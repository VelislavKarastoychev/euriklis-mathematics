"use strict";

import { Matrix } from "../src";
import validator from "@euriklis/validator-ts";

const a = [
  [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
  [0, Math.random(), Math.random(), Math.random(), Math.random()],
  [0, 0, Math.random(), Math.random(), Math.random()],
  [0, 0, 0, Math.random(), Math.random()],
  [0, 0, 0, 0, Math.random()],
];

const b = [
  [Math.random(), 0, 0, 0, 0],
  [Math.random(), Math.random(), 0, 0, 0],
  [Math.random(), Math.random(), Math.random(), 0, 0],
  [Math.random(), Math.random(), Math.random(), Math.random(), 0],
  [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
];

const l1 = Matrix.lowerTriangularRandom(2, 2, -1, 1, "generic");
const l2 = Matrix.lowerTriangularUniqueRandom(3, 3, -1, 1);
const u1 = Matrix.upperTriangularRandom(3, 3, -1, 1, "generic");
const u2 = Matrix.upperTriangularUniqueRandom(3, 6, -1, 1, "generic");
new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.multiplyUL(a, b),
      Matrix.times(a, b),
    ),
  ),
).describe("The multiplyUL method has to:")
  .test({ title: true, success: "green", error: "red" })
  .isInRange(-1e-8, 1e-8)
  .describe(
    "1. return the correct result when the first matrix is upper triangular and the second matrix is lower triangular.",
  ).test();

