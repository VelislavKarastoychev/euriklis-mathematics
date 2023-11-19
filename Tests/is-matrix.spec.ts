"use strict";
import { Matrix } from "../src/index.ts";
import validator from "@euriklis/validator";
new validator(Matrix.isMatrix(new Matrix()))
  .describe("isMatrix static method:").test({title: true, success: "green", error: "red"})
  .describe("1. has to checks if an object is a Matrix type.")
  .isSame(true).test()

