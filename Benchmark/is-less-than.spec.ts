"use strict";
import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import { MatrixType, NumericMatrix } from "../src/Matrix/types.ts";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const m1 = Matrix.random(...dimensions);
  const m2 = Matrix.random(dimensions[0], dimensions[1], 2, 3);
  const condition = numeric.lt(m1, m2) && Matrix.isLessThan(m1, m2);
  const euriklisTest = (m: any) => m.isLessThan(m1, m2);
  const numericTest = (m: any) => m.lt(m1, m2);
  const tfTest = (m: any) => m.less(m1, m2);
  startPerformanceTest(
    "isLessThan",
    [{ param: "matrices", dimensions, type: "float64" }],
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
      //   test: tfTest,
      // },
      // tensorFlowjsNode: {
      //   instance: tfNode,
      //   test: tfTest,
      // },
    },
  );
})();
