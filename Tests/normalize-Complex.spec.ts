"use strict";
import validator from "@euriklis/validator-ts";
import { Complex } from "../src";

const z1 = new Complex(3, 4);
const z2 = new Complex(0.6, 0.8);

new validator(z1.copy().normalize().isEquals(z2))
  .isSame(true)
  .describe("The normalize method of the Complex library has to:")
  .test({ title: true, success: "green", error: "red" })
  .describe("1. compute the normalized number of a complex number")
  .test();
