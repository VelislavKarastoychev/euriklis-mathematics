"use strict";
import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const r = Matrix.uniqueRandom(...dimensions);
  const condition = Matrix.isEqualTo(
    Matrix.ReLU(r),
    numeric.pointwise(["x[i]"], "ret[i] = x[i] <= 0 ? -1 : x[i]")(r),
  );
  const euriklisTest = (m: any) => m.ReLU(r);
  const numericTest = (m: any) =>
    m.pointwise(["x[i]"], "ret[i] = x[i] <= 0 ? -1 : x[i]")(r);
  startPerformanceTest(
    "ReLU",
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
