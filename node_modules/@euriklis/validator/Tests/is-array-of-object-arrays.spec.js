"use strict";
import validator from "../src/validator.js";
import { objectMatrix, print } from "./data.js";

new validator(objectMatrix).isArrayOfObjectArrays
  .and.bind(new validator("not array").not.isArrayOfObjectArrays)
  .on(true, (v) => {
    const t1 = v.benchmark((n) =>
      new validator(n).isArrayOfObjectArrays.answer
    );
    const t2 = v.benchmark((n) =>
      n instanceof Array
        ? n.every((row) =>
          Array.isArray(row)
            ? row.every((el) => el instanceof Object && !(el instanceof Array))
            : false
        )
        : false
    );
    print("isArrayOfObjectArrays", t1, t2);
  }).on(false, () => console.log("Error in isArrayOfObjectArrays"));
