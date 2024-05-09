"use strict";
import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const r = Matrix.uniqueRandom(...dimensions);
  const condition = Matrix.isEqualTo(
    Matrix.cotan(r),
    numeric.pointwise(["x[i]"], "ret[i] = 1/Math.tan(x[i])")(r),
  );
  const euriklisTest = (m: any) => m.cotan(r);
  const numericTest = (m: any) =>
    m.pointwise(["x[i]"], "ret[i] = 1 / Math.tan(x[i])")(r);
  startPerformanceTest(
    "cotan",
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
