"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";
const m = new Matrix([
  [-3, 5, 7],
  [2, 6, 4],
  [0, 2, 8],
]);
new validator(m.sumOfAllElements).isSame(31)
  .describe("The sumOfAllElements getter method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).describe(
    "1. returns the correct value (the sum of all elements of the matrix).",
  )
  .test();
