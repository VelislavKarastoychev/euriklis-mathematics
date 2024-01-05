"use strict";
import numeric from "numericjs";
import validator from "@euriklis/validator";
const m = numeric.random([5000, 5000]);
const benchmark = new validator(m).benchmark((m) => numeric.norm2(m), 1000);
console.table(benchmark);
