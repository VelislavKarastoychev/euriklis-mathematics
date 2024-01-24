"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";

const r = Matrix.random(3, 4);
const sqrt = r.M.map((r: number[]) => r.map((c: number) => Math.sqrt(c)));
const sqrtWeighted = r.M.map((r: number[]) =>
  r.map((c: number) => Math.sqrt(2 * c + 3))
);

new validator(r.sqrt().isEqualTo(sqrt))
  .describe("The sqrt method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe("1. return the correct result without method parameters")
  .test();

new validator(r.sqrt(2, 3).isEqualTo(sqrtWeighted))
  .isSame(true)
  .describe("2. return the correct result when the method has parameters.")
  .test();
