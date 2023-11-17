"use strict";

import validator from "../src/validator.js";
import { print } from "./data.js";

new validator(undefined).isUndefined.and.bind(new validator(null).not.isUndefined).on(true, () => {
  const v = new validator(undefined);
  const t1 = v.benchmark((u) => new validator(u).isUndefined.answer);
  const t2 = v.benchmark((u) => typeof u === "undefined");
  print("is undefined", t1, t2);
}).on(false, () => console.log("Error in the isUndefined method."));
