"use strict";
import validator from "../src/validator.js";
import { print } from "./data.js";
new validator(Promise.resolve("this is a promise")).isPromise
  .and.bind(
    new validator(
      new Promise((resolve, reject) => {
        if (1) resolve(1);
        else reject(2);
      }),
    ).isPromise,
  )
  .and.bind(
    new validator(function* () {
      return 0;
    }).not.isPromise,
  )
  .on(true, (v) => {
    const t1 = v.benchmark((n) => new validator(n).isPromise.answer);
    const t2 = v.benchmark((n) => n instanceof Promise);
    print("isPromise", t1, t2);
  }).on(false, () => console.log("Error in isPromise test..."));
