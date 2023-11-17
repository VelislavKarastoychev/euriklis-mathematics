"use strict";
import validator from "../src/validator.js";
import { print } from "./data.js";
new validator(undefined).isEmpty.on(true, (v) => {
  const t1 = v.benchmark((n) => new validator(n).isEmpty.answer);
  const t2 = v.benchmark((n) =>
    typeof (n === "undefined") || (n === "") ||
    (n instanceof Array ? n.length === 0 : false) ||
    (n instanceof Object ? Object.keys(n).length === 0 : false)
  );
  print("is empty", t1, t2);
});

