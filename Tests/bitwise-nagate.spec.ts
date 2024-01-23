"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";

const r = Matrix.random(3, 4);
const bneg = r.M.map((r: number[]) => r.map((c: number) => ~c));
new validator(r.bitwiseNegate.isEqualTo(bneg))
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
