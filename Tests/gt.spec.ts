"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";

const m = Matrix.random(3, 3);
const result = [
    [1, 0, 0],
    [0, 0, 0],
    [1, 1, 1],
  ];
new validator(
  m.gt(0.5).isEqualTo(result),
).describe("The gt method has to:")
  .test({
    title: true,
    success: "green",
    error: "red"
  })
  .describe("1. return the correct answer when the input is a number.")
  .isSame(true).test();
new validator(m.gt(Matrix.replicate(0.5, 3, 3)).isEqualTo(result))
  .describe("2. return the correct output, when the method parameter is a Matrix type")
  .isSame(true).test();
new validator(m.gt(Matrix.replicate(0.5, 3, 3).M).isEqualTo(result))
  .describe("3. return the correct result when the method parameter is numeric matrix")
  .isSame(true).test();
new validator(m.gt(Matrix.replicate(0.5, 3, 3).data).isEqualTo(result))
  .describe("4. returns the correct result, when the method parameter is a typed matrix.")
  .isSame(true).test();
