"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";

(async () => {
  const r1 = Matrix.random(5000, 5000);
  const r2 = r1.copy();
  const m1 = r1.M;

  new validator(r1.isEqualTo(r2))
    .isSame(true)
    .on(true, (v) => {
      v.describe("Time performance of the copy method:")
        .test({
          title: true,
          success: "green",
          error: "red",
        });
      const t1 = new validator(r1).benchmark((m) => m.copy());
      const t2 = new validator(m1).benchmark((m) => numeric.clone(m));
      console.table({
        "@euriklis/mathematics": t1,
        numericjs: t2,
      });
    }).on(false, (v) => {
      v.describe("Internal error in copy method.")
        .test({
          title: true,
          success: "green",
          error: "red",
        });
    });
})();
