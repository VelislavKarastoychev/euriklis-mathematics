"use strict";
import validator from "@euriklis/validator-ts";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
(async () => {
  const r1 = Matrix.random(5000, 5000);
  const r2 = Matrix.random(5000, 5000);
  const m1 = r1.M;
  const m2 = r2.M;
  new validator(r1.isEqualTo(r2)).isSame(true)
    .and.bind(
      new validator(numeric.same(m1, m2)).isSame(true),
    )
    .on(true, (v) => {
      v.describe("Time performance of the isEqualTo method:")
        .test({
          title: true,
          success: "green",
          error: "red",
        });
      const t1 = new validator(r1).benchmark((m) => m.isEqualTo(r2));
      const t2 = new validator(m1).benchmark((m) => numeric.same(m, m2));
      console.table({ "@euriklis/mathematics": t1, numericjs: t2 });
    }).on(false, (v) => {
      v.describe("Internal error in the isEqualMethod.")
        .test({
          title: true,
          success: "red",
          error: "green",
        });
    });
})();
