"use strict";

import validator from "../src/validator.js";
import {print} from "./data.js";
const v = new validator(12).isNumber.and.isInteger;
v.reset();
v.value = "dummies@example.com";
v.isString.and.isEmail.on(true, () =>  {
  const t1 = v.benchmark(email => new validator(email).isEmail.answer);
  const t2 = { mean: null, std: null, iterations: null};
  print("reset", t1, t2);
}).on(false, () => console.log('Error in reset method.'));

