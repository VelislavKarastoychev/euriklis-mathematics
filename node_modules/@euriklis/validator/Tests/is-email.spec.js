"use strict";
import validator from "../src/validator.js";
import { print } from "./data.js";

const legalEmail = "myEmail@example.com";
const legalEmail1 = "myEmail.somethingElse@example.text.ya.com";
const illegalEmail = "this is not legal email";
const illegalEmail1 = "illegalEmail@example and some text.com";

new validator(legalEmail).isEmail
  .and.bind(new validator(legalEmail1).isEmail)
  .and.bind(new validator(illegalEmail).not.isEmail)
  .and.bind(new validator(illegalEmail1).not.isEmail)
  .on(true, (v) => {
    const t1 = v.benchmark((n) => new validator(n).isEmail.answer);
    const t2 = v.benchmark((n) =>
      typeof n === "string"
        ? /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(n)
        : false
    );
    print("isEmail", t1, t2);
  }).on(false, () => console.log("Error in isEmail test..."));
