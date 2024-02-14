"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
(async () => {
  const r = Matrix.random(5000, 5000);
  const symmetric = r.plus(r.T).divide(2);
  new validator(
    symmetric.isSymmetric ===
      numeric.same(symmetric.M, numeric.transpose(symmetric.M)),
  ).isSame(true)
    .on(true, (v) => {
      v.describe(
        "Time performance of the isSymmetric getter method for matrix with dimension 5000 x 5000:",
      )
        .test({
          title: true,
          success: "green",
          error: "red",
        });
      const s = symmetric.M;
      const t1 = new validator(symmetric).benchmark((m) => m.isSymmetric);
      const t2 = new validator(s).benchmark((m) =>
        numeric.same(s, numeric.transpose(s))
      );
      console.table({
        "@euriklis/mathematics": t1,
        numericjs: t2,
      });
    }).on(false, (v) => {
      v.describe(
        "Internal error in isSymmetric method.",
      )
        .test({
          title: true,
          success: "green",
          error: "red",
        });
    });
})();
