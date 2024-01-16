"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";
const m = new Matrix([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]);
new validator(m.sumOfCubesOfAllElements).isSame(2025)
  .describe("The sumOfCubesOfAllElements getter method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).describe("1. compute the correct result (never NaN result).")
  .test();
