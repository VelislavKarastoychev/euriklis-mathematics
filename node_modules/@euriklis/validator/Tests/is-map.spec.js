"use strict";
import validator from "../src/validator.js";
import { map, print } from "./data.js";
new validator(map).isMap
  .and.bind(new validator(new Map()).isEmpty.and.isEmpty)
  .on(true, (v) => {
    const t1 = v.benchmark((n) => new validator(n).isMap.answer);
    const t2 = v.benchmark((n) =>
      Object.prototype.toString.call(n) === "[object Map]"
    );
    print("isMap", t1, t2);
  }).on(false, () => console.log("Error in isMap test..."));
