"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";

const r = Matrix.random(3, 4);
const bneg = r.M.map((r: number[]) => r.map((c: number) => ~c));
const bneg2 = r.M.map((r: number[]) => r.map((c: number)=> ~(2 * c)));
new validator(r.bitwiseNegate().isEqualTo(bneg))
  .describe("The bitwiseNegate method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe(
    "1. return a matrix with the bitwise negated elements of the elements.",
  )
  .test();

new validator(r.bitwiseNegate(2).isEqualTo(bneg2))
  .describe("2. return the correct result when a weight and bias are defined.")
  .isSame(true)
  .test();
