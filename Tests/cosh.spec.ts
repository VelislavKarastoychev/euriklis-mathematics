"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";

const r = Matrix.random(3, 4);
const cosh = r.M.map((r: number[]) => r.map((c: number) => Math.cosh(c)));
const coshWeighted = r.M.map((r: number[]) =>
  r.map((c: number) => Math.cosh(2 * c + 3))
);

new validator(r.cosh().isEqualTo(cosh))
  .describe("The cosh method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe("1. return the correct result without method parameters")
  .test();

new validator(r.cosh(2, 3).isEqualTo(coshWeighted))
  .isSame(true)
  .describe("2. return the correct result when the method has parameters.")
  .test();
