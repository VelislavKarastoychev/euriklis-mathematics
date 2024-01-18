
"use strict";
import validator from "@euriklis/validator";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import { NumericMatrix } from "../src/Matrix/types.ts";

(async () => {
  const r = Matrix.random(5000, 5000);
  const rm = r.M;
  const  halfs = Matrix.replicate(0.5, 5000, 5000);
  const halfsm = halfs.M;
  new validator(r.leq(halfs).isEqualTo(
    ((numeric.leq(rm, halfsm)) as boolean[][]).map(row => row.map((el: boolean) => +el)) as NumericMatrix)
  )
    .isSame(true)
    .on(true, (v) => {
      v.describe("Time performance of leq method:")
       .test({
          title: true,
          success: "green",
          error: "red"
        });
      const t1 = new validator(r).benchmark((m) => m.leq(halfs));
      const t2 = new validator(rm).benchmark((m) => numeric.leq(m, halfsm));
      console.table({
        "@euriklis/mathematics": t1,
        numericjs: t2
      });
    }).on(false, (v) => {
      v.describe("Internal error in leq benchmark test.")
       .test({
          title: true,
          success: "green",
          error: "red"
        });
    })
})();
