"use strict";
import validator from "@euriklis/validator";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";

const m = Matrix.random(5000, 5000, -1, 1);
new validator(m.inferior - numeric.inf(m.M.flat())).isInRange(-1e-8, 1e-8)
  .on(true, (v) => {
    v.describe("Time performance of inferior getter method:")
      .test({
        title: true,
        success: "green",
        error: "red",
      });
    const t1 = new validator(m).benchmark((m) => m.inferior);
    const t2 = new validator(m.M).benchmark((m) => numeric.inf(m.flat()));
    console.table({ "@euriklis/mathematics": t1, numericjs: t2 });
  }).on(false, (v) => {
    v.describe("Internal error in inferior benchmark test.")
      .test({
        title: true,
        success: "red",
        "error": "green",
      });
  });
