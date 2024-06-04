"use strict";

import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import { dimensions, startPerformanceTest } from "./utils.ts";
import type { NumericMatrix } from "../src/Types";

(async () => {
  const r = Matrix.uniqueRandom(...dimensions);
  const rc = Matrix.copy(r, "generic");
  const tc = tf.tensor2d(rc as NumericMatrix);
  const condition =
    Math.abs(
      Matrix.sumOfSquaresOfAllElements(r) -
        numeric.mapreduce("accum += xi*xi", "0")(rc),
    ) < 1e-6;
  const euriklisTest = (m: any) => m.sumOfSquaresOfAllElements(r);
  const numericTest = (m: any) => m.mapreduce("accum += xi * xi", "0")(rc);
  const tfTest = (m: any) => tf.square(tc).sum();
  startPerformanceTest(
    "sumOfSquaresOfAllElements",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTest
      },
      numericjs: {
        instance: numeric,
        test: numericTest
      },
      // tensorFlowjs: {
      //   instance: tf,
      //   test: tfTest
      // },
      tensorFlowjsNode: {
        instance: tfNode,
        test: tfTest
      }
    }
  );
})();
