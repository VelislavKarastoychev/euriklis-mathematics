"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";

const r = Matrix.random(3, 4);
const arctan = r.M.map((r: number[]) => r.map((c: number) => Math.atan(c)));
const arctanWeighted = r.M.map((r: number[]) =>
  r.map((c: number) => Math.atan(2 * c + 3))
);

new validator(r.arctan().isEqualTo(arctan))
  .describe("The arctan method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe("1. return the correct result without method parameters")
  .test();

new validator(r.arctan(2, 3).isEqualTo(arctanWeighted))
  .isSame(true)
  .describe("2. return the correct result when the method has parameters.")
  .test();
