"use strict";
import validator from "../src/validator.js";
import { objectMatrix, print } from "./data.js";

new validator(objectMatrix).isArrayOfObjectArraysWithEqualSize
  .and.bind(
    new validator([{ id: Math.random() }]).not
      .isArrayOfObjectArraysWithEqualSize,
  )
  .on(true, (v) => {
    const t1 = v.benchmark((n) =>
      new validator(n).isArrayOfObjectArraysWithEqualSize.answer
    );
    const t2 = v.benchmark((n) =>
      n instanceof Array
        ? n.every((row) =>
          Array.isArray(row)
            ? row.every((el) =>
              row.length === n[0].length && el instanceof Object &&
              !(el instanceof Array)
            )
            : false
        )
        : false
    );

    print("isArrayOfObjectArraysWithEqualSize", t1, t2);
  }).on(
    false,
    () => console.log("Error in isArrayOfObjectArraysWithEqualSize"),
  );
