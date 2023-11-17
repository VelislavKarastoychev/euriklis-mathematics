"use strict";
import validator from "../src/validator.js";
import { print } from "./data.js";

new validator({
  author: validator.author,
  version: validator.version,
}).interface({
  author: (auth) => auth.isString,
  version: (v) => v.isString,
}).on(true, (v) => {
  print("check version", v.value);
}).on(false, (v) => {
    console.log("Error in the version");
    console.log(v.value);
  });
