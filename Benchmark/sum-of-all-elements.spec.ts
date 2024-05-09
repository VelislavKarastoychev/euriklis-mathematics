"use strict";
import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const r = Matrix.uniqueRandom(...dimensions);
  const cr = Matrix.copy(r, "generic");
  const condition =
    Math.abs(Matrix.sumOfAllElements(r) - numeric.sum(cr)) < 1e-8;
  const euriklisTest = (m: any) => m.sumOfAllElements(r);
  const numericTest = (m: any) => m.sum(cr);
  const tfTest = (m: any) => m.sum(cr);
  startPerformanceTest(
    "sumOfAllElements",
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
