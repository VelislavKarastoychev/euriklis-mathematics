import validator from "../src/validator.js";
import { print, stringArray } from "./data.js";
new validator(stringArray).isStringArray.on(true, (v) => {
  const t1 = v.benchmark((s) => new validator(s).isStringArray.answer);
  const t2 = v.benchmark((s) =>
    s instanceof Array ? s.every((item) => typeof item === "string") : false
  );
  print("isStringArray for 1000000 elements", t1, t2);
}).on(false, () => console.log("Something went wrong with isStringArray..."));
