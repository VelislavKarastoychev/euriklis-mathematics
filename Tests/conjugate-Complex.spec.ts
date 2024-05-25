"use strict";
import validator from "@euriklis/validator-ts";
import { Complex } from "../src";

const z1 = new Complex(1, 2);
const z2 = new Complex(1, -2)

new validator(z1.conjugate().isEquals(z2))
  .isSame(true)
  .describe("The conjugate method of the Complex library has to:")
  .test({title: true, success: "green", error: "red"})
  .describe("1. return the correct output.")
  .test();
