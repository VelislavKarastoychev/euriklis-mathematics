"use strict";
import validator from "../src/validator.js";
import { numericArray, print } from "./data.js";

new validator(numericArray).hasLength(1e6)
  .describe("The method hasLength may be executed on array").test()
  .and.bind(
    new validator("hello world").hasLength(11)
      .describe("The method hasLength may be executed on string.")
      .test(),
  )
  .and.bind(
    new validator({ a: 1, b: 2, c: 3 }).hasLength(3)
      .describe("The hasLength method may be applied on objects.")
      .test(),
  )
  .and.bind(
    new validator(new ArrayBuffer(10)).hasLength(10)
      .describe("The hasLength method may be applied on ArrayBuffers.")
      .test(),
  )
  .and.bind(new validator([2, 3, 4]).not.hasLength(45))
  .and.bind(
    new validator((a) => new validator([1, 2]).hasLength(a))
      .throwsErrorWith("string")
      .describe(
        "The hasLength method has to throws error when its argument is NaN.",
      )
      .test()
  )
  .and.bind(
    new validator((a) => new validator([1, 2]).hasLength(a))
      .throwsErrorWith(Math.random())
      .describe("The hasLength has to throw error when the parameter is not integer.")
       .test()
  ).on(true, (v) => {
    const t1 = v.benchmark((n) => new validator(n).hasLength(1e6));
    const t2 = v.benchmark((n) => n.length === 1e6);
    print("hasLength", t1, t2);
  }).on(false, () => console.log("Error in hasLength"));
