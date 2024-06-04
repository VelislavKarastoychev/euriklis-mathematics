"use strict";

import numeric from "numericjs";
import { Matrix } from "../src";
import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import { dimensions, startPerformanceTest } from "./utils";

(async () => {
  const m1 = numeric.random(dimensions);
  const m2 = numeric.clone(Matrix.random(dimensions[0], dimensions[1], 1, 2));
  const condition = numeric.gt(m2, m1) && Matrix.isGreaterThan(m2, m1);
  const euriklisTest = (m: any) => m.isGreaterThan(m2, m1);
  const numericTest = (m: any) => m.gt(m2, m1);
  const tfTest = (m: any) => tf.greater(m2, m1);
  startPerformanceTest(
    "isGreaterThan",
    [{ param: "matrices", dimensions, type: "float64" }],
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
      // over 4s.
      // tensorFlowjs: {
      //   instance: tf,
      //   test: tfTest,
      // },
      // tensorFlowjsNode: {
      //   instance: tfNode,
      //   test: tfTest
      // }
    }
  );
})();
