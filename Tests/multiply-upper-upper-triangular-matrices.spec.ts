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
  [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
  [0, Math.random(), Math.random(), Math.random(), Math.random()],
  [0, 0, Math.random(), Math.random(), Math.random()],
  [0, 0, 0, Math.random(), Math.random()],
  [0, 0, 0, 0, Math.random()],
];

new validator(
  Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.multiplyUU(a, b),
      Matrix.times(a, b),
    ),
  ),
).isInRange(-1e-8, 1e-8)
  .describe("The multiplyUU method has to:")
  .test({ title: true, success: "green", error: "red" })
  .describe(
    "1. return the correct result when the matrices are upper triangular.",
  )
  .test();
