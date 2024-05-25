"use strict";
import validator from "@euriklis/validator-ts";
import { Complex } from "../src";
import { E, PI } from "../src/utils";

const z1 = new Complex(3, 4);
const z2 = new Complex(PI, E);
const z3 = new Complex(
  -1.44834935306680122605321973557214133843748017667452083694303673,
  20.7212160997363086599314359471759990300604188786003020088006812,
);

const mul = (
  a: Complex | number | undefined,
  b: Complex | number | undefined,
): Complex => {
  return new Complex(a).times(b);
};
new validator(z1.times(z2).isNearlyEquals(z3))
  .isSame(true)
  .on(false, (v) => console.log(v.value.Re))
  .describe("The times method of the Complex library has to:")
  .test({ title: true, success: "green", error: "red" })
  .describe("1. return the correct result.")
  .test();

new validator(mul)
  .throwsErrorWith("it throws", "because of error parameters")
  .describe("2. throw error when the parameters are incorrectly defined.")
  .test();
