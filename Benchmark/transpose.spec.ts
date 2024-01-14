"use strict";
import validator from "@euriklis/validator";
import numeric from "numericjs";
import { Matrix } from "../src/index.js";

(async () => {
  const r = Matrix.random(5000, 5000);
  const m = r.M;
  new validator(r.transpose().isEqualTo(numeric.transpose(m))).isSame(true)
    .on(true, (v) => {
      v.describe("Time performance of transpose method:")
        .test({
          title: true,
          success: "green",
          error: "red",
        });
      const t1 = new validator(r).benchmark((m) => m.transpose());
      const t2 = new validator(m).benchmark((m) => numeric.transpose(m));
      console.table({ "@euriklis/mathematics": t1, numericjs: t2 });
    }).on(false, (v) => {
      v.describe("Internal error in transpose method.")
        .test({
          title: true,
          success: "red",
          error: "green",
        });
    });
})();
