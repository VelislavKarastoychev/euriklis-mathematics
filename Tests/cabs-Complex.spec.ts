"use strict";
import validator from "@euriklis/validator-ts";
import { Complex } from "../src";
import { E, PI } from "../src/utils";
const a = new Complex(-2 * PI, -E);
const cabs = 2 * PI + E;

new validator(a.cabs()).isSame(cabs)
  .describe("The cabs method of the Complex library has to:")
  .test({ title: true, success: "green", error: "red" })
  .describe(
    "1. return the sum of the absolute values of the real and imaginary part of a number.",
  )
  .test();
