"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";

const r1 = Matrix.random(3, 4);
const zeros = Matrix.zeros(3, 4);
new validator(r1.plus(r1.negate).isEqualTo(zeros))
  .describe("The negate getter method has to:")
  .test({
    title: true,
    success: "green",
    error: "red"
  }).isSame(true)
  .describe("1. return the correct result (the negative value of each element).")
  .test();
