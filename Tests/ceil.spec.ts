"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";

const r = Matrix.random(3, 4, -1, 1);
const m = r.M.map((r: number[]) => r.map((c: number) => Math.ceil(c)));
const m1 = r.M.map((r: number[]) =>
  r.map((c: number) => Math.ceil(2 * c + 3))
);

new validator(r.ceil().isEqualTo(m))
  .describe("The ceil method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe("1. return the correct result without parameters.")
  .test();

new validator(r.ceil(2, 3).isEqualTo(m1))
  .isSame(true)
  .describe(
    "2. return the correct result when the method's parameters are declared.",
  )
  .test();
