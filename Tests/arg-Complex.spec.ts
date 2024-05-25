'use strict';
import validator from "@euriklis/validator-ts";
import { Complex } from "../src";
import { atan2 } from "../src/utils";

const z1 = new Complex(3, 4);
const arg = atan2(4, 3);
const z2 = new Complex(13, 14);
const arg1 = atan2(14, 13);

new validator(z1.arg()).isSame(arg)
  .and.bind(new validator(z2.arg()).isSame(arg1))
  .describe("The arg method of the Complex library has to:")
  .test({title: true, success: "green", error: "red"})
  .describe("1. compute the angle of the complex number.")
  .test();
