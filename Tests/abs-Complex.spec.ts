"use strict";
import validator from "@euriklis/validator-ts";
import { Complex } from "../src";

const z1 = new Complex(3, 4);
const abs = 5;

new validator(z1.abs()).isSame(5)
  .describe("The abs method of the Complex library has to:")
  .test({ title: true, success: "green", error: "red" })
  .describe("1. compute the magnitude of the complex number.")
  .test();
