"use strict";
import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const r = Matrix.uniqueRandom(...dimensions);
  const cr = Matrix.copy(r, "generic");
  const condition = Math.abs(Matrix.maxNorm(r) - numeric.sup(numeric.sup(cr))) < 1e-8;
  const euriklisTest = (m: any) => m.maxNorm(r);
  const numericTest = (m: any) => m.sup(cr.flat());
  const tfTest = (m: any) => m.norm(cr, Infinity);
  startPerformanceTest(
    "maxNorm",
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
      // tensorFlowjsNode: {
      //   instance: tfNode,
      //   test: tfTest
      // }
    }
  );
})();
