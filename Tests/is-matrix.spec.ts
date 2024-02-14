"use strict";
import { Matrix } from "../src/index.ts";
import validator from "@euriklis/validator-ts";
new validator(Matrix.isMatrix([[1, 2, 3]]))
  .describe("isMatrix static method:").test({
    title: true,
    success: "green",
    error: "red",
  })
  .describe("1. has to checks if an object is a Matrix type.")
  .isSame(true).test();

new validator(Matrix.isMatrix("not matrix")).isSame(false)
  .and.bind(
    new validator(Matrix.isMatrix([1.2, 2, 3])).isSame(false)
  ).and.bind(
    new validator(Matrix.isMatrix([[1, 2, 3], [Math.PI]])).isSame(false)
  )
  .describe("2. has to return false when the parameter is not matrix.").test();
