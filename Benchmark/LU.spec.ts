"use strict";
import validator from "@euriklis/validator";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import { CompactLUFactorizationWithPermutations } from "../src/Matrix/Models/index.ts";

(async () => {
  const m = numeric.random([1000, 1000]);
  const r = new Matrix(m);
  new validator(true)
    .isSame(true)
    .on(true, (v) => {
      v.describe("Time performance of the LUPC method:")
        .test({
          title: true,
          success: "green",
          error: "red",
        });
      const t1 = new validator(r).benchmark((m) => m.LUPC());
      const t2 = new validator(m).benchmark((m) => numeric.LU(m));
      console.table({
        "@euriklis/mathematics": t1,
        numericjs: t2,
      });
    }).on(false, (v) => {
      v.describe("Internal error in the LUPC method.")
        .test({
          title: true,
          success: "green",
          error: "red",
        });
    });
})();
