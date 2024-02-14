"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";

const r = Matrix.random(3, 4);
const tanh = r.M.map((r: number[]) => r.map((c: number) => Math.tanh(c)));
const tanhWeighted = r.M.map((r: number[]) =>
  r.map((c: number) => Math.tanh(2 * c + 3))
);

new validator(r.tanh().isEqualTo(tanh))
  .describe("The tanh method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe("1. return the correct result without method parameters")
  .test();

new validator(r.tanh(2, 3).isEqualTo(tanhWeighted))
  .isSame(true)
  .describe("2. return the correct result when the method has parameters.")
  .test();
