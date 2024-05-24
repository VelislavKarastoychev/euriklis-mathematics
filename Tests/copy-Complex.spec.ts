"use strict";
import validator from "@euriklis/validator-ts";
import { Complex } from "../src";
import { E, PI } from "../src/utils";

const z1 = new Complex(PI, E);
const z2 = z1.copy();

new validator(z1.Re).isSame(z2.Re)
  .and.bind(
    new validator(z1.Im).isSame(z2.Im),
  ).describe("The copy method of the Complex library has to:")
  .test({ title: true, success: "green", error: "red" })
  .describe("1. create new instance with the same real and imaginary values.")
  .test();

z2.Re = E;
z2.Im = PI;

new validator(z1.Re).isSame(z2.Im)
  .and.bind(
    new validator(z1.Im).isSame(z2.Re),
  ).describe(
    "2. keep the initial instance immutable when the copied instance changes.",
  )
  .test();
