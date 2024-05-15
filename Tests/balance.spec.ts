"use strict";

import validator from "@euriklis/validator-ts";
import { Matrix } from "../src";

const matrix = [
  [1.00, 2.00, 3.00, 4.00],
  [5.00, 6.00, 7.00, 8.00],
  [9.00, 10.00, 11.00, 12.00],
  [13.00, 14.00, 15.00, 16.00],
];

const cOutput = [
  [1.00000000, 4.00000000, 6.00000000, 8.00000000],
  [2.50000000, 6.00000000, 7.00000000, 8.00000000],
  [4.50000000, 10.00000000, 11.00000000, 12.00000000],
  [6.50000000, 14.00000000, 15.00000000, 16.00000000],
];

const areNearlyEquals = Matrix.isNearlyEqualTo(
  Matrix.balance(matrix),
  cOutput,
  1e-5,
);

new validator(areNearlyEquals)
  .describe("The balance methood of the Matrix library has to:")
  .test({ title: true, success: "green", error: "red" })
  .describe("1. produce the same output as the balanc routine in C.")
  .isSame(true)
  .test();
