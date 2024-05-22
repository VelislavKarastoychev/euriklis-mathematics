"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src";

const a = [
  [-5, 1, 2],
  [2, -4, -1],
  [2, 0, -11]
];
const circles = [
  [-8, -7, -13],
  [-2, -1, -9]
];

new validator(Matrix.isEqualTo(Matrix.GershgorinCircles(a), circles))
  .describe("The GerschgorinCircles method has to:")
  .test({title: true, success: "green", error: "red"})
  .isSame(true)
  .describe("1. extract the points of the eigenvalues in row vectors.")
  .test();
