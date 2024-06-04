"use strict";

import validator from "@euriklis/validator-ts";
import { Complex } from "../src";

const z1 = new Complex(3, 4);
const z2 = new Complex(
  1.60943791243410037460075933322618763952560135426851772191264789,
  0.927295218001612232428512462922428804057074108572240527621866177,
);
new validator(z1.copy().log().isNearlyEquals(z2))
  .isSame(true)
  .describe("The log method of the Complex library has to:")
  .test({ title: true, success: "green", error: "red" })
  .describe(
    `1. compute corrrectly the logarithm of a complex number: ln(${z1.toString()}) = ${z1.copy().log().toString()}`,
  )
  .test();
