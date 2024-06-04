"use strict";

import validator from "@euriklis/validator-ts";
import { Complex } from "../src";

const z1 = new Complex(3, 4);
const z2 = new Complex(5, 6);
const z3 = new Complex(
  -1.86089330688086479735913196141582518578524868008258089337092472,
  11.8367671067643704469371227607012790034138017532519121321091695,
);
new validator(z1.copy().pow(z2).isNearlyEquals(z3))
  .isSame(true)
  .describe("The pow method of the Complex library has to:")
  .test({ title: true, success: "green", error: "red" })
  .describe(
    `1. compute the power of a complex number from another complex number: (${z1.toString()})^(${z2.toString()}) = ${z3.toString()}`,
  )
  .test();

new validator(z1.copy().pow(1).isEquals(z1))
  .isSame(true)
  .describe(
    `2. computes correctly the power of unit: (${z1.toString()})^1 === ${z1.toString()}`,
  )
  .test();

new validator(z1.copy().pow(0).isEquals(1))
  .isSame(true)
  .describe(
    `2. computes correctly the power of zero: (${z1.toString()})^0 === 1`,
  )
  .test();
