"use strict";
import validator from "../src/validator.js";
import { print } from "./data.js";
const generatorFunction = function* (i = 10) {
  // return 10 20 30 ... 100.
  while (i < 100) {
    yield i;
    i += 10;
  }
  return i;
};
const g = generatorFunction();
new validator(generatorFunction).isGenerator
  .and.bind(new validator(g).isGenerator)
  .and.bind(new validator(() => {}).not.isGenerator)
  .on(true, (v) => {
    const t1 = v.benchmark((f) => new validator(f).isGenerator.answer);
    const t2 = v.benchmark((f) =>
      f instanceof Function
        ? f.constructor.name === "Generator"
        : f instanceof Object
        ? Object.prototype.toString.call(f) === "[object Generator]"
        : false
    );
    print('Generator function', t1, t2);
  }).on(false, () => console.log('Something went wrong in generator function test'));
