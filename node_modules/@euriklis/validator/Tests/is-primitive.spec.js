"use strict";
import validator from "../src/validator.js";
import { print } from "./data.js";

const aString = "I am a string";
const aNumber = Math.PI;
const aBigInteger = BigInt(
  "2939848392839239482029834820239342903928329842182110893273284",
);
const aSymbol = Symbol("foo");
const aNull = null;
const anUndefined = undefined;
const aBoolean = true;
const aFunction = () => {};
const anArray = [];
const anObject = {};
new validator(aString).isPrimitiveType
  .and.bind(new validator(aNumber).isPrimitiveType)
  .and.bind(new validator(aBigInteger).isPrimitiveType)
  .and.bind(new validator(aSymbol).isPrimitiveType)
  .and.bind(new validator(aNull).isPrimitiveType)
  .and.bind(new validator(anUndefined).isPrimitiveType)
  .and.bind(new validator(aBoolean).isPrimitiveType)
  .and.bind(new validator(aFunction).not.isPrimitiveType)
  .and.bind(new validator(anArray).not.isPrimitiveType)
  .and.bind(new validator(anObject).not.isPrimitiveType)
  .on(true, (v) => {
    const t1 = v.benchmark((n) => new validator(n).isPrimitiveType.answer);
    const t2 = v.benchmark((n) =>
      typeof n === "number" || typeof n === "string" ||
      typeof n === "undefined" || n === null || typeof n === "bigint" ||
      typeof n === "symbol" || typeof n === "boolean"
    );
    print("is primitive type", t1, t2);
  }).on(false, () => console.log("Error in isPrimitiveType test..."));
