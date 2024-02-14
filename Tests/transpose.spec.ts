"use strict";
import { Matrix } from "../src/index.ts";
import validator from "@euriklis/validator-ts";
const a = Matrix.random(27, 23);
new validator(a.transpose().M).forEvery((row, i) =>
  row.forEvery((el, j) => el.isSame(a.M[j as number][i as number]))
).describe("transpose method has to:").test({
  title: true,
  success: "green",
  error: "red",
})
  .describe("1. Has to produce the correct result").test();

new validator(a.transpose().transpose().M).isSame(a.M).describe(
  "2. return the initial matrix, when is called again",
).test();
