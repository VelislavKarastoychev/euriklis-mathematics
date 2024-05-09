"use strict";
import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import { dimensions, startPerformanceTest } from "./utils.ts";
import { NumericMatrix } from "../src/Matrix/types.ts";

(async () => {
  const m1 = Matrix.uniqueRandom(dimensions[0], dimensions[1], 10, 30);
  const m2 = Matrix.uniqueRandom(dimensions[0], dimensions[1], 20, 50);
  const condition = Matrix.isEqualTo(
    Matrix.bitwiseOr(m1, m2),
    numeric.bor(m1, m2),
  );
  const euriklislTest = (m: any) => m.bitwiseOr(m1, m2);
  const numericTest = (m: any) => m.bor(m1, m2);
  const [t1, t2] = [m1, m2].map(numeric.clone);
  const tfTest = (m: any) =>
    tf.logicalOr(t1 as NumericMatrix, t2 as NumericMatrix);
  startPerformanceTest(
    "bitwiseOr",
    [{ param: "matrices", dimensions, type: "float64" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklislTest
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
