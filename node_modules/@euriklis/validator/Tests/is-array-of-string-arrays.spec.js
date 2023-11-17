"use strict";
import validator from "../src/validator.js";
import { stringMatrix, print } from "./data.js";
stringMatrix[0].push("Hello");
new validator(stringMatrix).isArrayOfStringArrays.on(true, (v) => {
  const t1 = v.benchmark((s) => new validator(s).isArrayOfStringArrays.answer);
  const t2 = v.benchmark((s) =>
    s instanceof Array
      ? s.every((row) =>
        row instanceof Array ? row.every((el) => typeof el === "string") : false
      )
      : false
  );
  print("isArrayOfStringArrays", t1, t2);
}).on(
  false,
  () => console.log("Something went wrong in isArrayOfStringArrays!"),
);
stringMatrix[0].pop();

