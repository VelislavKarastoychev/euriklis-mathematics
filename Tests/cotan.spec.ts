"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";

const r = Matrix.random(3, 4);
const cotan = r.M.map((r: number[]) => r.map((c: number) => 1/Math.tan(c)));
const cotanWeighted = r.M.map((r: number[]) =>
  r.map((c: number) => 1/Math.tan(2 * c + 3))
);

new validator(r.cotan().isEqualTo(cotan))
  .describe("The cotan method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe("1. return the correct result without method parameters")
  .test();

new validator(r.cotan(2, 3).isEqualTo(cotanWeighted))
  .isSame(true)
  .describe("2. return the correct result when the method has parameters.")
  .test();
