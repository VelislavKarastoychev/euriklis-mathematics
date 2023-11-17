"use strict";
import numeric from "numericjs";
import validator from "@euriklis/validator";
const b = new validator(numeric).benchmark(n => n.rep([5000, 5000], 0))
console.log(b);
console.log(numeric.rep([2, 3], 0));
