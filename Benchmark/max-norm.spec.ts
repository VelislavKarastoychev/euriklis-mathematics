"use strict";
import validator from "@euriklis/validator";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";

(async () => {
  const r1 = Matrix.random(2, 5, -1, 1);
  const m1 = r1.M;
  new validator(r1.maxNorm).isSame(numeric.sup(m1.flat()))
    .on(true, (v) => {
      v.describe("Time performance of max norm method or superior method:")
        .test({
          title: true,
          success: "green",
          error: "red",
        });
      const t1 = new validator(r1).benchmark((m) => m.maxNorm);
      const t2 = new validator(m1).benchmark((m) => numeric.sup(m.flat()));
      console.table({ "@euriklis/mathematics": t1, numericjs: t2 });
    }).on(false, (v) => {
      v.describe("Internal error in maxNorm method.")
        .test({
          title: true,
          success: "red",
          error: "green",
        });
    });
})();
