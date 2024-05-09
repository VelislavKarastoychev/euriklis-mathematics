"use strict";
import { NumericMatrix } from "../src/Matrix/types.ts";
import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const m1 = Matrix.uniqueRandom(dimensions[0], dimensions[1], 10, 30);
  const m2 = Matrix.uniqueRandom(dimensions[0], dimensions[1], 20, 50);
  const condition = Matrix.isEqualTo(Matrix.or(m1, m2), numeric.or(m1, m2));
  const test = (m: any) => m.or(m1, m2);
  const [t1, t2] = [m1, m2].map(numeric.clone);
  const tfTest = (m: any) =>
    m.logicalOr(t1 as NumericMatrix, t2 as NumericMatrix);
  startPerformanceTest(
    "or",
    [{ param: "matrices", dimensions, type: "float64" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test,
      },
      numericjs: {
        instance: Matrix,
        test
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
