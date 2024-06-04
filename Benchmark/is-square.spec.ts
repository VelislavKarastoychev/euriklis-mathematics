"use strict";

import { dimensions, startPerformanceTest } from "./utils";
import { Matrix } from "../src";
import numeric from "numericjs";
import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
(async () => {
  const condition = Matrix.isMatrix(Matrix.random(2, 2));
  const m1 = Matrix.random(...dimensions);
  const m2 = numeric.random(dimensions);
  const t1 = tf.tensor2d(m2);
  const euriklisTest = (m: any) => m.isSquare(m1);
  const numericTest = (m: any) => {
    const [rows, columns] = m.dim(m2);
    return rows === columns;
  };

  const tfTest = (_: any) => {
    const shape = t1.shape;
    return shape[0] === shape[0];
  };

  startPerformanceTest(
    "isSquare",
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
      tensorFlowjs: {
        instance: tf,
        test: tfTest,
      },
      tensorFlowjsNode: {
        instance: tfNode,
        test: tfTest,
      },
    },
  );
})();
