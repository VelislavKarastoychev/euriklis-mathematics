"use strict";
import validator from "../src/validator.js";
import { print } from "./data.js";
new validator({
  name: "Dubatur",
  computeAge: () => this.name.length * 10 * Math.random() >> 0,
})
  .isObject
  .on(true, (v) => {
    const t1 = v.benchmark((n) => new validator(n).isObject.answer);
    const t2 = v.benchmark((n) =>
      Object.prototype.toString.call(n) === "[object Object]"
    );
    print("isObject", t1, t2);
  }).on(false, () => console.log("Something went wrong with isObject method!"));

