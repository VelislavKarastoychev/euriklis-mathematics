"use strict";
import numeric from "numericjs";
import validator from "@euriklis/validator";
const b = new validator(numeric).benchmark(n => n.random([5000, 5000]))
console.table(b);
