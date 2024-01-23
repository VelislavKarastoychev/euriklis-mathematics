"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";

const r = Matrix.random(3, 4);
const sinh = r.M.map((r: number[]) => r.map((c: number) => Math.sinh(c)));
const sinhWeighted = r.M.map((r: number[]) =>
  r.map((c: number) => Math.sinh(2 * c + 3))
);

new validator(r.sinh().minus(sinh).FrobeniusNorm)
  .describe("The sinh method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isInRange(-1e-8, 1e-8)
  .describe("1. return the correct result without method parameters")
  .test();

new validator(r.sinh(2, 3).minus(sinhWeighted).FrobeniusNorm)
  .isInRange(-1e-8, 1e8)
  .describe("2. return the correct result when the method has parameters.")
  .test();
