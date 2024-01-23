"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";

(async () => {
  const r = Matrix.random(5000, 5000);
  const m = r.M;
  new validator(r.bitwiseNegate.isEqualTo(numeric.bnot(m)))
    .isSame(true)
    .on(true, (v) => {
      v.describe("Time performance of bitwiseNegate getter method:")
       .test({
          title: true,
          success: "green",
          error: "red"
        });
      const t1 = new validator(r).benchmark((m) => m.bitwiseNegate);
      const t2 = new validator(m).benchmark((m) => numeric.bnot(m));
      console.table({
        "@euriklis/mathematics": t1,
        numericjs: t2
      });
    }).on(false, (v) => {
      v.describe("Internal error in bitwiseNegate benchmark test.")
      .test({
          title: true,
          success: "red",
          error: "green"
        });
    })
})();
