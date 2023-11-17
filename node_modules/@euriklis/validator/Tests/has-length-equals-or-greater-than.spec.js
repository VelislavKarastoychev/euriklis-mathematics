"use strict";
import validator from "../src/validator.js";
import { numericArray, print } from "./data.js";
const l = 1e6;
new validator(numericArray).hasLengthEqualsOrGreaterThan(l)
  .describe("A numeric array is correct input for hasLengthEqualOrGreaterThan")
  .test()
  .and.bind(new validator("hello world").hasLengthEqualsOrGreaterThan(11))
  .describe("A string as an iterable is correct input for the hasLengthEqualsOrGreaterThan.")
  .test()
  .and.bind(new validator(new Set("Hello")).hasLengthEqualsOrGreaterThan(4))
  .describe("A set is legal input for the method hasLengthEqualsOrGreaterThan.")
  .test()
  .on(true, (v) => {
    const t1 = v.benchmark((n) =>
      new validator(n).hasLengthEqualsOrGreaterThan(l).answer
    );
    const t2 = v.benchmark((n) => n.length >= l);
    print("hasLengthEqualsOrGreaterThan", t1, t2);
  }).on(
    false,
    () => console.log("Error in hasLengthEqualsOrGreaterThan test..."),
  );
