"use strict";
import validator from "../src/validator.js";
import { print } from "./data.js";

new validator(Symbol("foo")).isSymbol.and.bind(new validator(1234).not.isSymbol)
  .on(true, (v) => {
    const t1 = v.benchmark((s) => new validator(s).isSymbol.answer);
    const t2 = v.benchmark((s) => typeof s === "symbol");
    print("is symbol", t1, t2);
  }).on(false, () => console.log("Error in isSymbol method."));
