"use strict";
import validator from "@euriklis/validator-ts";
import { Complex } from "../src";
const z1 = new Complex();
const z2 = new Complex(2);
const z3 = new Complex(1, 2);
const z4 = new Complex(z3, Math.PI);
const createComplex = (a: number | undefined | Complex) => new Complex(a);
new validator(z1.Re).isSame(0)
  .and.bind(
    new validator(z1.Im).isSame(0),
  )
  .describe("The Complex instance has to:")
  .test({ title: true, success: "green", error: "red" })
  .describe("1. Generate zero elements when no argument is inserted.")
  .test();

new validator(z2.Re).isSame(2)
  .and.bind(
    new validator(z2.Im).isSame(0),
  ).describe(
    "2. create a  real number automatically completed the imaginary part, when it is omitted.",
  )
  .test();

new validator(z3.Re).isSame(1)
  .and.bind(
    new validator(z3.Im).isSame(2),
  ).describe(
    "3. create correctly complex number instance when the real and imaginary part are inserted.",
  )
  .test();

new validator(z4.isEquals(z3))
  .isSame(true)
  .and.bind(
    new validator(z4.Re).isSame(1),
  ).and.bind(
    new validator(z4.Im).isSame(2),
  ).describe(
    "4. create correctly complex number instance when the argument is a Complex number (ignores the second argument if exists).",
  )
  .test();

new validator(createComplex)
  .throwsErrorWith("it throws")
  .describe("5. throw error when incorrect parameters are iserted.")
  .test();
