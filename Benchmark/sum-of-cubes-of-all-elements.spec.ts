"use strict";

import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils.ts";
import type { NumericMatrix } from "../src/Types";

(async () => {
  const r = Matrix.uniqueRandom(...dimensions);
  const rc = Matrix.copy(r, "generic");
  const t = tf.tensor2d(rc as NumericMatrix);
  const condition =
    Math.abs(
      Matrix.sumOfCubesOfAllElements(r) -
        numeric.mapreduce("accum += xi * xi * xi", "0")(rc),
    ) < 1e-5;
  const euriklisTest = (m: any) => m.sumOfCubesOfAllElements(r);
  const numericTest = (m: any) => m.mapreduce("accum += xi * xi * xi", "0")(rc);
  const tfTest = (m: any) => m.pow(t, 3).sum();
  startPerformanceTest(
    "sumOfCubesOfAllElements",
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
        test: tfTest,
      }
    }
  );
})();
