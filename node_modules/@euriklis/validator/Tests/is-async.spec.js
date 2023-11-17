"use strict";
import validator from "../src/validator.js";
import { print } from "./data.js";
const asyncFunction = async () => {
  console.log('This is an async function. But do worry now!');
}
const f = () => console.log("I am a function!");
new validator(asyncFunction).isAsync
  .and.bind(new validator(f).not.isAsync)
  .on(true, (v) => {
  const t1 = v.benchmark((f) => new validator(f).isAsync.answer);
  const t2 = v.benchmark((f) =>
    typeof f === "function" ? f.constructor.name === "AsyncFunction" : false
  );
  print("Async function", t1, t2);
}).on(false, () => console.log("Error in isAsync"));
