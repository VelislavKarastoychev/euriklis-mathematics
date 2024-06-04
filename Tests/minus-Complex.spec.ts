"use strict";

import validator from "@euriklis/validator-ts";
import { Complex } from "../src";

const z1 = new Complex(10);
const z2 = new Complex(undefined, 10);
const z3 = new Complex(10, -10);
const sub = (
  a: Complex | number | undefined,
  b: Complex | number | undefined,
) => {
  return new Complex(a).minus(b);
};

new validator(z1.minus(z2).minus(z3).isEquals(0))
  .isSame(true)
  .on(false, (v) => console.log(v.value.Re, v.value.Im))
  .describe("The minus method of the Complex library has to:")
  .test({ title: true, success: "green", error: "red" })
  .describe(
    "1. return the correct output for different kind of parameter declaration.",
  )
  .test();

new validator(sub)
  .throwsErrorWith(
    "it throws",
    "because the parameters are incorrectly defined",
  )
  .describe("2. throw error when the parameters are incorrectly defined.")
  .test();
