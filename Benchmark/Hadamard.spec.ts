"use strict";

import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils.ts";
(async () => {
  const r1 = Matrix.uniqueRandom(...dimensions);
  const r2 = Matrix.uniqueRandom(...dimensions);
  const t1 = tf.randomNormal(dimensions);
  const t2 = tf.randomNormal(dimensions);
  const condition = Matrix.isEqualTo(
    Matrix.Hadamard(r1, r2),
    numeric.mul(r1, r2),
  );
  const euriklisTest = (m: any) => m.Hadamard(r1, r2);
  const numericTest = (m: any) => m.mul(r1, r2);
  const tfTest = (m: any) => m.mul(t1, t2);
  startPerformanceTest(
    "Hadamard",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTest,
      },
      // numericjs: {
      //   instance: numeric,
      //   test: numericTest,
      // },
      // tensorFlowjs: {
      //   instance: tf,
      //   test: tfTest,
      // },
      tensorFlowjsNode: {
        instance: tfNode,
        test: tfTest
      }
    },
  );
})();
