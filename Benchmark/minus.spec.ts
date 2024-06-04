"use strict";

import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils.ts";
(async () => {
  const r1 = Matrix.uniqueRandom(...dimensions);
  const r2 = Matrix.uniqueRandom(...dimensions);
  const t1 = tfNode.randomNormal(dimensions);
  const t2 = tfNode.randomNormal(dimensions);
  const condition = Matrix.isEqualTo(
    Matrix.minus(r1, r2),
    numeric.sub(r1, r2),
  );
  const euriklisTest = (m: any) => m.minus(r1, r2);
  const numericTest = (m: any) => m.sub(r1, r2);
  const tfTest = (m: any) => tf.sub(t1, t2);
  startPerformanceTest(
    "minus",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTest,
      },
      numericjs: {
        instance: numeric,
        test: numericTest,
      },
      // tensorFlowjs: {
      //   instance: tf,
      //   test: tfTest
      // },
      tensorFlowjsNode: {
        instance: tfNode,
        test: tfTest,
      },
    },
  );
})();
