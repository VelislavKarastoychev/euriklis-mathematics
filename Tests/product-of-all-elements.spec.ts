"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";

const m = new Matrix([
  [-3, 5, 7],
  [2, 6, 4],
  [0, 2, 8],
]);

new validator(m.productOfAllElements).isSame(0)
  .describe("The productOfAllElements getter method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).describe(
    "1. return the correct result (the product of all matrix elements).",
  )
  .test();
