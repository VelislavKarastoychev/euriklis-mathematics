"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";

(async () => {
  const r = Matrix.random(5000, 5000);
  const m = r.M;

  new validator(r.negate().isEqualTo(numeric.neg(m)))
    .isSame(true)
    .on(true, (v) => {
      v.describe(
        "Time performance of the negate getter method for matrix with dimension 5000 x 5000:",
      )
        .test({
          title: true,
          success: "green",
          error: "red",
        });

      const t1 = new validator(r).benchmark((m) => m.negate());
      const t2 = new validator(m).benchmark((m) => numeric.neg(m));
      console.table({
        "@euriklis/mathematics": t1,
        numericjs: t2,
      });
    })
    .on(false, (v) => {
      v.describe(
        "Internal error in the negate benchmark test. Probably the unary pointwise utiltiy function has an error.",
      )
        .test({
          title: true,
          success: "red",
          error: "green",
        });
    });
})();
