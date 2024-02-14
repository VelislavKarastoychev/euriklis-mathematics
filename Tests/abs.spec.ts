"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";

const r = Matrix.random(3, 4, -1, 1);
const abs = r.M.map((r: number[]) => r.map((c: number) => Math.abs(c)));
const absWeighted = r.M.map((r: number[]) =>
  r.map((c: number) => Math.abs(2 * c + 3))
);
new validator(r.abs().isEqualTo(abs))
  .describe("The abs method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe("1. return the correct result without method parameters")
  .test();

new validator(r.abs(2, 3).isEqualTo(absWeighted))
  .isSame(true)
  .describe("2. return the correct result when the method has parameters.")
  .test();
