"use strict";
import validator from "@euriklis/validator-ts";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import { NumericMatrix } from "../src/Matrix/types.ts";

(async () => {
  const r = Matrix.random(5000, 5000, 1, 100);
  const rm = r.M;
  const  halfs = Matrix.replicate(5, 5000, 5000);
  const halfsm = halfs.M;
  new validator(r.and(halfs).isEqualTo(
    ((numeric.and(rm, halfsm)) as boolean[][]).map(row => row.map((el: boolean) => +el)) as NumericMatrix)
  )
    .isSame(true)
    .on(true, (v) => {
      v.describe("Time performance of and method:")
       .test({
          title: true,
          success: "green",
          error: "red"
        });
      const t1 = new validator(r).benchmark((m) => m.and(halfs));
      const t2 = new validator(rm).benchmark((m) => numeric.and(m, halfsm));
      console.table({
        "@euriklis/mathematics": t1,
        numericjs: t2
      });
    }).on(false, (v) => {
      v.describe("Internal error in and benchmark test.")
       .test({
          title: true,
          success: "green",
          error: "red"
        });
    });
})();
