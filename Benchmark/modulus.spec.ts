"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
(async () => {
  const r1 = Matrix.random(5000, 5000);
  const r2 = Matrix.random(5000, 5000, 1, 2);
  const m1 = r1.M;
  const m2 = r2.M;
  new validator(r2.modulus(r1).isEqualTo(numeric.mod(m2, m1)))
    .isSame(true)
    .on(true, (v) => {
      v.describe("Time performance of the modulus method:")
        .test({
          title: true,
          success: "green",
          error: "red",
        });
      const t1 = new validator(r2).benchmark((m) => m.modulus(r1));
      const t2 = new validator(m2).benchmark((m) => numeric.mod(m, m1));
      console.table({
        "@euriklis/mathematics": t1,
        numericjs: t2,
      });
    }).on(false, (v) => {
      v.describe("Internal error in modulus method.")
        .test({
          title: true,
          success: "green",
          error: "red",
        });
    });
})();
