"use strict";
import validator from "../src/validator.js";
import { print } from "./data.js";
const set = new Set();
set.add(1234);
set.add(345);
for (const i of [2, 3, 4, 5, 6, 7, 8, 9, 10]) {
  set.add(Math.random() * i);
}
new validator(set).isSet.on(true, (v) => {
  const t1 = v.benchmark((f) => new validator(f).isSet.answer);
  const t2 = v.benchmark((f) => f instanceof Set);
  print("is set", t1, t2);
});
