"use strict";
import { Matrix } from "../src/index.ts";
import validator from "@euriklis/validator";
new validator(Matrix.isMatrix(new Matrix()))
  .describe("The isMatrix static method has to checks if an object is a Matrix type.")
  .isSame(true).test()

