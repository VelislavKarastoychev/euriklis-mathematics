"use strict";
import validator from "@euriklis/validator";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";

const rep1 = Matrix.replicate(Math.PI, 5, 5);
const rep2 = numeric.rep([5, 5], Math.PI);
(async () =>
  new validator(rep1.isEqualTo(new Matrix(rep2))).isSame(true)
    .describe("Time performance of the replicate method:")
    .test({
      title: true,
      success: "green",
      error: "red",
    })
    .on(true, () => {
      const t1 = new validator(Matrix).benchmark((m) =>
        m.replicate(Math.PI, 5000, 5000)
      );
      const t2 = new validator(numeric).benchmark((num) =>
        num.rep([5000, 5000], Math.PI)
      );
      console.table({ "@euriklis/mathematics": t1, numericjs: t2 });
    }))();
