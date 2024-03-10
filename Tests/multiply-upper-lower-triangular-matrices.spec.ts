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

const l1 = Matrix.randomLowerTriangular(2, 2, -1, 1, "generic");
const l2 = Matrix.uniqueRandomLowerTriangular(3, 3, -1, 1);
const u1 = Matrix.randomUpperTriangular(3, 3, -1, 1, "generic");
const u2 = Matrix.uniqueRandomUpperTriangular(3, 3, -1, 1, "generic");
new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.multiplyUL(u2, l2),
      Matrix.times(u2, l2),
    ),
  ),
).describe("The multiplyUL method has to:")
  .test({ title: true, success: "green", error: "red" })
  .isInRange(-1e-8, 1e-8)
  .describe(
    "1. return the correct result when the first matrix is upper triangular and the second matrix is lower triangular.",
  ).test();

