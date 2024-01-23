"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";

const r = Matrix.random(3, 4);
const exp = r.M.map((r: number[]) => r.map((c: number) => Math.exp(c)));
const expWeighted = r.M.map((r: number[]) =>
  r.map((c: number) => Math.exp(2 * c + 3))
);

new validator(r.exp().isEqualTo(exp))
  .describe("The exp method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe("1. return the correct result without method parameters")
  .test();

new validator(r.exp(2, 3).isEqualTo(expWeighted))
  .isSame(true)
  .describe("2. return the correct result when the method has parameters.")
  .test();
