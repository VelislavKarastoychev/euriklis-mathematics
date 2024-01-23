"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";

const r = Matrix.random(3, 4);
const arccos = r.M.map((r: number[]) => r.map((c: number) => Math.acos(c)));
const arccosWeighted = r.M.map((r: number[]) =>
  r.map((c: number) => Math.acos(0.5 * c + 0.1))
);

new validator(r.arccos().isEqualTo(arccos))
  .describe("The arccos method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe("1. return the correct result without method parameters")
  .test();

new validator(r.arccos(0.5, 0.1).isEqualTo(arccosWeighted))
  .isSame(true)
  .describe("2. return the correct result when the method has parameters.")
  .test();
