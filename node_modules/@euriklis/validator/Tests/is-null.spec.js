"use strict";

import validator from "../src/validator.js";
import { print } from "./data.js";

new validator(null).isNull.and.bind(new validator(undefined).not.isNull).on(true, (v) => {
  const t1 = v.benchmark((n) => new validator(n).isNull.answer);
  const t2 = v.benchmark((n) => n === null);
  print("is null", t1, t2);
})
