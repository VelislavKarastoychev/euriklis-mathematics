"use strict";
import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils.ts";
import { NumericMatrix } from "../src/Matrix/types.ts";
(async () => {
  const m1 = Matrix.uniqueRandom(dimensions[0], dimensions[1], 10, 30);
  const m2 = Matrix.uniqueRandom(dimensions[0], dimensions[1], 20, 50);
  const condition = Matrix.isEqualTo(Matrix.xor(m1, m2), numeric.bxor(m1, m2));
  const test = (m: any) => m.xor(m1, m2);
  const ntest = (m: any) => m.bxor(m1, m2);
  const [t1, t2] = [m1, m2].map(numeric.clone);
  const tfTest = (m: any) => tf.logicalXor(t1 as NumericMatrix, t2 as NumericMatrix);
  startPerformanceTest(
    "xor",
    [{ param: "matrices", dimensions, type: "float64" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test,
      },
      numericjs: {
        instance: numeric,
        test: ntest,
      },
      // tensorFlowjs: {
      //   instance: tf,
      //   test: tfTest,
      // },
      // tensorFlowjsNode: {
      //   instance: tfNode,
      //   test: tfTest,
      // },
    },
  );
})();
