import validator from "../src/validator.js";
import { print } from "./data.js";
new validator(Math.PI).isNumber.on(true, (v) => {
  const t1 = v.benchmark((n) => new validator(n).isNumber.answer);
  const t2 = v.benchmark((n) => typeof n === "number");
  print("isNumber", t1, t2);
});
