"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";

const r = Matrix.random(3, 4);
const ReLU = r.M.map((r: number[]) => r.map((c: number) => c <= 0 ? -1 : c));
const ReLUWeighted = r.M.map((r: number[]) =>
  r.map((c: number) => (2 * c + 3) <= 0 ? -1 : 2 * c + 3)
);

new validator(r.ReLU().isEqualTo(ReLU))
  .describe("The ReLU method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe("1. return the correct result without method parameters")
  .test();

new validator(r.ReLU(2, 3).isEqualTo(ReLUWeighted))
  .isSame(true)
  .describe("2. return the correct result when the method has parameters.")
  .test();