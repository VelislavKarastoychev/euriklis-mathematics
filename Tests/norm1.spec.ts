"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";

const m = new Matrix(
  [
    [-3, 5, 7],
    [2, 6, 4],
    [0, 2, 8],
  ],
);

new validator(m.norm1).isSame(19)
  .describe("The norm1 method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).describe(
    "1. Compoute the correct result of the maximum absolute column sum for a matrix.",
  )
  .test();
