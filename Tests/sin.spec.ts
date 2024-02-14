"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";

const r = Matrix.random(3, 4);
const sin = r.M.map((r: number[]) => r.map((c: number) => Math.sin(c)));
const sinWeighted = r.M.map((r: number[]) =>
  r.map((c: number) => Math.sin(2 * c + 3))
);

new validator(r.sin().isEqualTo(sin))
  .describe("The sin method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe("1. return the correct result without method parameters")
  .test();

new validator(r.sin(2, 3).isEqualTo(sinWeighted))
  .isSame(true)
  .describe("2. return the correct result when the method has parameters.")
  .test();
