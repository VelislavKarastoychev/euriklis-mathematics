"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";

(async () => {
  const r = Matrix.random(5000, 5000, -10, 10);
  const m = r.M;
  new validator(r.ceil().isEqualTo(numeric.ceil(m)))
    .isSame(true)
    .on(true, (v) => {
      v.describe("Time performance of the ceil method:")
        .test({
          title: true,
          success: "green",
          error: "red",
        });
      const t1 = new validator(r).benchmark((m) => m.ceil());
      const t2 = new validator(m).benchmark((m) => numeric.ceil(m));
      console.table({
        "@euriklis/mathematics": t1,
        numericjs: t2,
      });
    }).on(false, (v) => {
      v.describe("Internal error in the ceil benchmark test method.")
        .test({
          title: true,
          success: "green",
          error: "red",
        });
    });
})();
