"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";

const r = Matrix.random(3, 4);
const arcsin = r.M.map((r: number[]) => r.map((c: number) => Math.asin(c)));
const arcsinWeighted = r.M.map((r: number[]) =>
  r.map((c: number) => Math.asin(0.5 * c + 0.1))
);

new validator(r.arcsin().isEqualTo(arcsin))
  .describe("The arcsin method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe("1. return the correct result without method parameters")
  .test();

new validator(r.arcsin(0.5, 0.1).minus(arcsinWeighted).FrobeniusNorm)
  .isInRange(-1e-8, 1e-8)
  .describe("2. return the correct result when the method has parameters.")
  .test();
