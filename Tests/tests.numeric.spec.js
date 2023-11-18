"use strict";
import numeric from "numericjs";
import validator from "@euriklis/validator";
const rand = numeric.random([6000, 6000]);
const b = new validator(rand).benchmark(matrix => numeric.getBlock(matrix, [0, 0], [4999, 4999]));
console.table(b)
