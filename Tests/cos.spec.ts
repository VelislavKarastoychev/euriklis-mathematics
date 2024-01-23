"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";

const r = Matrix.random(3, 4);
const cos = r.M.map((r: number[]) => r.map((c: number) => Math.cos(c)));
const cosWeighted = r.M.map((r: number[]) =>
  r.map((c: number) => Math.cos(2 * c + 3))
);

new validator(r.cos().isEqualTo(cos))
  .describe("The cos method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe("1. return the correct result without method parameters")
  .test();

new validator(r.cos(2, 3).isEqualTo(cosWeighted))
  .isSame(true)
  .describe("2. return the correct result when the method has parameters.")
  .test();
