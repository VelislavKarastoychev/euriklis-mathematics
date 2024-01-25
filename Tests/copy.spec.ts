"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";

const r1 = Matrix.random(3, 4);
const r2 = r1.copy();
new validator(r1.isEqualTo(r2))
  .isSame(true)
  .describe("The copy method has to:")
  .test({
    title: true,
    success: "green",
    error: "red",
  }).describe("1. copies the initial matrix.")
  .test();

new validator(r1.cos().isEqualTo(r2))
  .isSame(false)
  .describe("2. be immutable with respect to the initial matrix.")
  .test();
