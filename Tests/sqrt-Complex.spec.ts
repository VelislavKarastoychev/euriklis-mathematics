"use strict";

import validator from "@euriklis/validator-ts";
import { Complex } from "../src";
import { sqrt } from "../src/utils";

const z1 = new Complex(2);
const z2 = new Complex(3, 4);
const z3 = new Complex(sqrt(2));
const z4 = new Complex(2, 1);

new validator(
  z1.copy().sqrt().isNearlyEquals(z3) && z2.copy().sqrt().isNearlyEquals(z4),
)
  .isSame(true)
  .describe("The sqrt method of the Complex library has to:")
  .test({ title: true, success: "green", error: "red" })
  .describe(
    `1. compute correctly the square root of a complex number: sqrt(${z1.toString()}) = ${z3.toString()} and sqrt(${z2.toString()}) = ${z4.toString()} and sqrt(${new Complex(-1).toString()}) = ${new Complex(-1).sqrt().toString()}`,
  )
  .test();
