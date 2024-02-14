"use strict";
import validator from "@euriklis/validator-ts";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import { validateHeaderValue } from "http";

(async () => {
  const m = Matrix.random(5000, 5000, -1, 1);
  new validator(m.superior - numeric.sup(m.M.flat())).isInRange(-1e-8, 1e-8)
    .on(true, (v) => {
      v.describe("Time performance of the superior method:")
        .test({
          title: true,
          success: "green",
          error: "red",
        });
      const t1 = new validator(m).benchmark((m) => m.superior);
      const t2 = new validator(m.M).benchmark((m) => numeric.sup(m.flat()));
      console.table({ "@euriklis/mathematics": t1, numericjs: t2 });
    }).on(false, (v) => {
      v.describe("Internal error in superior benchmark test.")
        .test({
          title: true,
          success: "green",
          error: "red",
        });
    });
})();
