"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";

const r = Matrix.random(3, 4);
const arccotan = r.M.map((r: number[]) => r.map((c: number) => Math.PI/2 - Math.atan(c)));
const arccotanWeighted = r.M.map((r: number[]) =>
  r.map((c: number) => Math.PI/2 - Math.atan((2 * c + 3)))
);

new validator(r.arccotan().isEqualTo(arccotan))
  .describe("The arccotan method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe("1. return the correct result without method parameters")
  .test();

new validator(r.arccotan(2, 3).isEqualTo(arccotanWeighted))
  .isSame(true)
  .describe("2. return the correct result when the method has parameters.")
  .test();
