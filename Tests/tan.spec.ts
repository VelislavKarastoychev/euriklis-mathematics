"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";

const r = Matrix.random(3, 4);
const tan = r.M.map((r: number[]) => r.map((c: number) => Math.tan(c)));
const tanWeighted = r.M.map((r: number[]) =>
  r.map((c: number) => Math.tan(2 * c + 3))
);

new validator(r.tan().isEqualTo(tan))
  .describe("The tan method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe("1. return the correct result without method parameters")
  .test();

new validator(r.tan(2, 3).isEqualTo(tanWeighted))
  .isSame(true)
  .describe("2. return the correct result when the method has parameters.")
  .test();
