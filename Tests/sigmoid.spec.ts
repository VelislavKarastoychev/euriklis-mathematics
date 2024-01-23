"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";

const r = Matrix.random(3, 4);
const sigmoid = r.M.map((r: number[]) => r.map((c: number) => 1 / (1 + Math.exp(-c))));
const sigmoidWeighted = r.M.map((r: number[]) =>
  r.map((c: number) => 1 / (1 + Math.exp(-(2 * c + 3))))
);

new validator(r.sigmoid().isEqualTo(sigmoid))
  .describe("The sigmoid method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe("1. return the correct result without method parameters")
  .test();

new validator(r.sigmoid(2, 3).isEqualTo(sigmoidWeighted))
  .isSame(true)
  .describe("2. return the correct result when the method has parameters.")
  .test();
