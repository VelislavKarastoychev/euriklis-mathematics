"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";

(async () => {
  const r = Matrix.random(5000, 5000);
  const m = r.M;
  new validator(r.sin().isEqualTo(numeric.sin(m)))
    .isSame(true)
    .on(true, (v) => {
      v.describe(
        "Time performance of the sin method with matrix with dimension 5000 x 5000.",
      )
        .test({
          title: true,
          success: "green",
          error: "red",
        });
      const t1 = new validator(r).benchmark((m) => m.sin());
      const t2 = new validator(m).benchmark((m) => numeric.sin(m));
      console.table({
        "@euriklis/mathematics": t1,
        numericjs: t2,
      });
    })
    .on(false, (v) => {
      v.describe("Internal error in sin benchmark test method.")
        .test({
          title: true,
          success: "red",
          error: "green",
        });
    });
})();
