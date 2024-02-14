"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";

const r = Matrix.random(3, 4);
const floor = r.M.map((r: number[]) => r.map((c: number) => Math.floor(c)));
const floorWeighted = r.M.map((r: number[]) =>
  r.map((c: number) => Math.floor(2 * c + 3))
);

new validator(r.floor().isEqualTo(floor))
  .describe("The floor method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).isSame(true)
  .describe("1. return the correct result without method parameters")
  .test();

new validator(r.floor(2, 3).isEqualTo(floorWeighted))
  .isSame(true)
  .describe("2. return the correct result when the method has parameters.")
  .test();
