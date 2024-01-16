"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";

(async () => {
  const m = Matrix.random(5000, 5000, -1, 1);
  const md = m.M;
  new validator(m.sumOfAllElements - numeric.sum(md)).isInRange(-1e-8, 1e-8)
    .on(true, (v) => {
      v.describe("Time performance of the sumOfAllElements getter method:")
        .test({
          title: true,
          success: "green",
          "error": "red",
        });
      const t1 = new validator(m).benchmark((m) => m.sumOfAllElements);
      const t2 = new validator(md).benchmark((m) => numeric.sum(m));
      console.table({
        "@euriklis/mathematics": t1,
        numericjs: t2,
      });
    }).on(false, (v) => {
      v.describe("Internal error in sumOfAllElements benchmark test.")
        .test({
          title: true,
          success: "red",
          error: "green",
        });
    });
})();
