"use strict";
import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import { Matrix } from "../src";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils";
(async () => {
  const r1 = Matrix.uniqueRandom(...dimensions);
  const r2 = Matrix.uniqueRandom(...dimensions);
  const t1 = tfNode.randomNormal(dimensions);
  const t2 = tfNode.randomNormal(dimensions);
  const condition = Matrix.isEqualTo(
    Matrix.power(r1, r2),
    numeric.pow(r1, r2),
  );
  const euriklisTest = (m: any) => m.power(r1, r2);
  const numericTest = (m: any) => m.pow(r1, r2);
  const tfTest = (m: any) => m.pow(t1, t2);
  startPerformanceTest(
    "power",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTest,
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
