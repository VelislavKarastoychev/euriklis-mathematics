"use strict";
import validator from "../src/validator.js";
import { print } from "./data.js";

new validator(34).isGreaterThan(Math.E)
  .and.bind(new validator(Math.PI).not.isGreaterThan(200))
  .and.bind(new validator(23).not.isGreaterThan(23))
  .on(true, (v) => {
    const t1 = v.benchmark((n) =>
      new validator(n).isGreaterThan(Math.E).answer
    );
    const t2 = v.benchmark((n) => n > Math.E);
    print("is greater than", t1, t2);
  }).on(false, () => console.log("Error in isGreaterThan test..."));
