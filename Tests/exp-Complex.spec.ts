"use strict";

import validator from "@euriklis/validator-ts";
import { Complex } from "../src";

const z1 = new Complex(1, 2);
const expZ1 = new Complex(
  -1.13120438375681363843125525551079471062886799582652575021772191,
  2.47172667200481892761693089355166453273619036924100818420075883,
);

new validator(z1.exp().isNearlyEquals(expZ1))
  .isSame(true)
  .describe("The exp method of the Complex library has to:")
  .test({ title: true, success: "green", error: "red" })
  .describe("1. compute correctly the exponent of a complex number.").test();
