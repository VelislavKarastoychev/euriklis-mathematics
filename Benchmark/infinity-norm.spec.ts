"use strict";
import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils.ts";
import { NumericMatrix } from "../src/Matrix/types.ts";

(async () => {
  const r = Matrix.uniqueRandom(...dimensions);
  const cr = Matrix.copy(r, "generic") as NumericMatrix;
  const condition = Math.abs(
    Matrix.infinityNorm(r) - numeric.sup(cr.map((row: number[]) =>
      numeric.norm1(row)
    )),
  ) < 1e-8;
  const euriklisTest = (m: any) => m.infinityNorm(r);
  const numericTest = (m: any) => m.sup(cr.map((row) => numeric.norm1(row)));
  // const tfTest = (m: any) => m.max(m.sum(m.abs(cr)));
  startPerformanceTest(
    "infinityNorm",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTest
      },
      numericjs: {
        instance: numeric,
        test: numericTest
      },
      // tensorFlowjs: {
      //   instance: tf,
      //   test: tfTest
      // },
      // tensorFlowjsNode: {
      //   instance: tfNode,
      //   test: tfTest
      // }
    }
  );
})();
