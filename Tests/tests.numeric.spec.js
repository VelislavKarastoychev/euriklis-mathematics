"use strict";
import numeric from "numericjs";
import validator from "@euriklis/validator";


const m = numeric.random([6000, 6000]);
const block = numeric.random([5000, 5000]);
const benchmark = new validator(numeric).benchmark(n => n.setBlock(m, [100, 99], [5099, 5098], block));
console.table(benchmark)
