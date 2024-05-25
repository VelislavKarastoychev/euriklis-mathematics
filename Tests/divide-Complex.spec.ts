"use strict";

import validator from "@euriklis/validator-ts";
import { Complex } from "../src";

const z1 = new Complex(4, 5);
const z2 = new Complex(5, 4);
const z3 = new Complex(40 / 41, 9 / 41);
const div = (
  a: Complex | number | undefined,
  b: Complex | number | undefined,
) => new Complex(a).divide(b);
new validator(z1.divide(z2).isNearlyEquals(z3))
  .isSame(true)
  .and.bind(
    new validator(new Complex(2, 4).divide(0, 1).isEquals(4, -2)).isSame(true),
  )
  .and.bind(
    new validator(
      new Complex(3, -6).divide(1, -5).isNearlyEquals(33 / 26, 9 / 26),
    ).isSame(true),
  )
  .and.bind(
    new validator(
      new Complex(3, -1).divide(2, 1).isNearlyEquals(1, -1),
    ).isSame(true),
  )
  .and.bind(
    new validator(
      new Complex(-3, -5).divide(-3, -5).isEquals(1),
    ).isSame(true),
  )
  .and.bind(
    new validator(
      new Complex(-3, 2).times(3, 3).divide(new Complex(4, 1).times(4, 4))
        .isNearlyEquals(-15 / 34, 33 / 68),
    ).isSame(true),
  )
  .on(false, (v) => console.log(v.value.Re, v.value.Im))
  .describe("The divide method of the Complex library has to:")
  .test({ title: true, success: "green", error: "red" })
  .describe("1. return the correct result")
  .test();
new validator(div)
  .throwsErrorWith("it", "throws")
  .and.throwsErrorWith(new Complex(1, 2), new Complex(0))
  .describe(
    "2. throw error when the parameters are incorrectly defined or the diivisor is zero.",
  )
  .test();

