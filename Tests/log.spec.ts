"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";

const r = Matrix.random(3, 4);
const log = r.M.map((r: number[]) => r.map((c: number) => Math.log(c)));
const logWeighted = r.M.map((r: number[]) =>
  r.map((c: number) => Math.log(2 * c + 3))
);

new validator(r.log().isEqualTo(log))
  .describe("The log method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe("1. return the correct result without method parameters")
  .test();

new validator(r.log(2, 3).isEqualTo(logWeighted))
  .isSame(true)
  .describe("2. return the correct result when the method has parameters.")
  .test();
