"use strict";

import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import numeric from "numericjs";
import { Matrix } from "../src";
import { dimensions, startPerformanceTest } from "./utils";

(async () => {
  const m1 = Matrix.random(...dimensions);
  const m2 = Matrix.copy(m1, undefined, 2, 1);
  const condition = Matrix.isEqualTo(Matrix.copy(numeric.geq(m2, m1)), Matrix.geq(m2, m1));
  const test = (m: any) => m.geq(m2, m1);
  const tfTest = (m: any) => m.greaterEqual(m2, m1);
  startPerformanceTest(
    "geq",
    [{ param: "matrices", dimensions, type: "float64" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test
      },
      numericjs: {
        instance: numeric,
        test,
      },
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
