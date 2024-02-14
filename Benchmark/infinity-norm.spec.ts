"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";

const m = Matrix.random(5000, 5000);
(async () => {
  new validator(Math.abs(m.infinityNorm - numeric.sup(m.M.map(numeric.norm1))) < 1e-8).isSame(true)
    .on(true, (v) => {
      v.describe("Time performance of the infinity norm method:")
       .test({
          title: true,
          success: "green",
          error: "red"
        });
      const t1 = new validator(m).benchmark((m) => m.infinityNorm);
      const t2 = new validator(m.M).benchmark((m) => numeric.sup(m.map(numeric.norm1)));
      console.table({"@euriklis/mathematics": t1, numericjs: t2});
    }).on(false, (v) => {
      v.describe("Internal error in infinity norm benchmark test.")
       .test({
          title: true, 
          success: "red",
          error: "green"
        })
    });
})();
