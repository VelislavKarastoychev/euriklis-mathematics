"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";

const r = Matrix.random(3, 4, -1, 1);
const m = r.M.map((r: number[]) => r.map((c: number) => Math.round(c)));
const m1 = r.M.map((r: number[]) =>
  r.map((c: number) => Math.round(2 * c + 3))
);

new validator(r.round().isEqualTo(m))
  .describe("The round method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe("1. return the correct result without parameters.")
  .test();

new validator(r.round(2, 3).isEqualTo(m1))
  .isSame(true)
  .describe(
    "2. return the correct result when the method's parameters are declared.",
  )
  .test();