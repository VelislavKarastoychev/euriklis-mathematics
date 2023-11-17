"use strict";
import validator from "../src/validator.js";
import { print } from "./data.js";
new validator(22).isInClosedRange(22, 23)
  .and.bind(new validator("22").not.isInClosedRange(22, 23))
  .and.bind(
    new validator((a, b) => new validator(22).isInClosedRange(a, b))
      .throwsErrorWith("22", "23"),
  )
  .on(true, (v) => {
    const t1 = v.benchmark((n) =>
      new validator(n).isInClosedRange(22, 23).answer
    );
    const t2 = v.benchmark((n) =>
      typeof n === "number" && !isNaN(n) && n >= 22 && n <= 23
    );
    print("is in closed range", t1, t2);
  }).on(false, () => console.log("Error in the isInClosedRange test..."));
