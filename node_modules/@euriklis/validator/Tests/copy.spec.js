"use strict";
import validator from "../src/validator.js";
import { print } from "./data.js";

const v = new validator({ number: 123 });
const v1 = v.copy();
v1.value = { number: 321 };
v.not.isSame(v1.value)
  .describe("Copied isntances can change their values.").test()
  .on(true, () => {
    const t1 = v.benchmark((n) => new validator(n).not.isSame(v1.value).answer);
    const t2 = { mean: null, std: null, iterations: null };
    print("copy", t1, t2);
  });
