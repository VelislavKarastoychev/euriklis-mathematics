"use strict";
import validator from "../src/validator.js";
import { print } from "./data.js";

new validator(BigInt(1323484848389239393438493498483984395349938358n)).isBigInt
  .on(true, (v) => {
    const t1 = v.benchmark((n) => new validator(n).isBigInt.answer);
    const t2 = v.benchmark((n) => typeof n === "bigint");
    print("is BigInt", t1, t2);
  }).on(false, () => console.log("Error in isBigInt test..."));
