"use strict";

import validator from "@euriklis/validator-ts";
import { Complex } from "../src";
import { E, PI } from "../src/utils";
const z1 = new Complex();
const z2 = new Complex(PI, E);
const z3 = new Complex(-PI, -E);
const add = (
  a: Complex | number | undefined,
  b: Complex | number | undefined,
): Complex => {
  return new Complex(a).plus(b);
};
new validator(z1.plus(z2).plus(z3).isEquals(0))
  .isSame(true)
  .describe("The plus method has to:")
  .test({ title: true, success: "green", error: "red" })
  .describe("1. return correct output.")
  .test();

const x1 = new Complex(4, 5);
const x2 = new Complex(undefined, -4);

new validator(x1.plus(x2).plus(-3).isEquals(1, 1))
  .isSame(true)
  .describe(
    "2. provide the choice of inserting different types of parameter like pairs, Complex instances and real numbers.",
  )
  .test();

new validator(add)
  .throwsErrorWith("it throws", "because the types are incorrect")
  .describe("3. throw error when the parameters are incorrectly defined.")
  .test();
