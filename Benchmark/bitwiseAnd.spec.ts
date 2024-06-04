"use strict";

import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const m1 = numeric.clone(Matrix.uniqueRandom(dimensions[0], dimensions[1], 10, 30));
  const m2 = numeric.clone(Matrix.uniqueRandom(dimensions[0], dimensions[1], 20, 50));
  const condition = Matrix.isEqualTo(
    Matrix.bitwiseAnd(m1, m2),
    Matrix.copy(numeric.band(m1, m2)),
  );
  const euriklisTest = (m: any) => m.bitwiseAnd(m1, m2);
  const numericTest = (m: any) => m.band(m1, m2);
  const tfTest = (m: any) => tf.bitwiseAnd(m1, m2);
  startPerformanceTest(
    "bitwiseAnd",
    [{ param: "matrices", dimensions, type: "float64" }],
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
