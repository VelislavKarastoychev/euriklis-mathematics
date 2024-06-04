"use strict";

import { Matrix } from "../src";
import validator from "@euriklis/validator-ts";
import type { MatrixType, NumericMatrix } from "../src/Types";

const a: MatrixType | NumericMatrix = [
  [Math.random(), 0, 0, 0, 0],
  [Math.random(), Math.random(), 0, 0, 0],
  [Math.random(), Math.random(), Math.random(), 0, 0],
  [Math.random(), Math.random(), Math.random(), Math.random(), 0],
  [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
];

const b: MatrixType | NumericMatrix = [
  [Math.random(), 0, 0, 0, 0],
  [Math.random(), Math.random(), 0, 0, 0],
  [Math.random(), Math.random(), Math.random(), 0, 0],
  [Math.random(), Math.random(), Math.random(), Math.random(), 0],
  [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
];

new validator(Matrix.FrobeniusNorm(
  Matrix.minus(
    Matrix.times(a, b),
    Matrix.multiplyLL(a, b),
  ),
)).isInRange(-1e-8, 1e-8)
  .describe("The multiplyLL method has to:")
  .test({ title: true, success: "green", error: "red" })
  .describe("1. multiply correctly lower triangular matrices.")
  .test();
