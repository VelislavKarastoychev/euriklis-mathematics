"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";

const m = new Matrix([
  [-3, 5, 7],
  [2, 6, 4],
  [0, 2, 8],
]);
new validator(m.superior).describe("The superior method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(8).describe(
    "1. returns the correct value (the element with maximum value in the matrix).",
  )
  .test();
