"use strict";

import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import numeric from "numericjs";
import {  Matrix } from "../src/index.ts";
import type { NumericMatrix } from "../src/Types";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const r = Matrix.uniqueRandom(...dimensions);
  const t1 = tf.tensor2d(Matrix.copy(r, "generic") as NumericMatrix);
  const condition = Matrix.isEqualTo(
    Matrix.plus(r, r),
    numeric.add(r, r),
  );
  const euriklisTest = (m: any) => m.plus(r, r);
  const numericTest = (m: any) => m.add(r, r);
  const tfTest = (m: any) => m.add(t1, t1);

  startPerformanceTest(
    "plus",
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
      //   test: tfTest,
      // },
      // tensorFlowjsNode: {
      //   instance: tfNode,
      //   test: tfTest,
      // },
    },
  );
})();
