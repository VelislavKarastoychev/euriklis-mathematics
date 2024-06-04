"use strict";

import validator from "@euriklis/validator-ts";
import { Complex } from "../src";

const z1 = new Complex(4);
const z2 = new Complex(3, 4);
const z3 = new Complex(.25);
const z4 = new Complex(.12, -.16);

new validator(
  z1.copy().reciprocal().isEquals(z3) && z2.copy().reciprocal().isEquals(z4),
)
  .isSame(true)
  .describe("The reciprocal method of the Complex library has to:")
  .test({ title: true, success: "green", error: "red" })
  .describe(
    `1. computes the reciprocal value of a complex number: 1 / (${z1.toString()}) = ${z3.toString()} and 1 / (${z2.toString()}) = ${z4.toString()}`,
  ).test();
