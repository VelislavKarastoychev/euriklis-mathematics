"use strict";

import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const r = Matrix.uniqueRandom(dimensions[0], dimensions[1], -19, 10);
  const condition = Matrix.isEqualTo(
    Matrix.step(r),
    numeric.pointwise(["x[i]"], "ret[i] = x[i] <= 0 ? -1 : 1")(r),
  );
  const euriklisTest = (m: any) => m.step(r);
  const numericTest = (m: any) =>
    m.pointwise(["x[i]"], "ret[i] = x[i] <= 0 ? -1 : 1")(r);
  startPerformanceTest(
    "step",
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
    },
  );
})();
