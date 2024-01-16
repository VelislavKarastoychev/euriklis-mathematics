"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";

const m = new Matrix([
  [-3, 5, 7],
  [2, 6, 4],
  [0, 2, 8],
]);

new validator(m.inferior)
  .describe("The inferior method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(-3).describe(
    "1. return the correct value (the element with the minimal value in the matrix).",
  )
  .test();
