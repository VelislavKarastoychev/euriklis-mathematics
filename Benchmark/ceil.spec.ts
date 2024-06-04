"use strict";

import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const r = Matrix.uniqueRandom(dimensions[0], dimensions[1], -10, 10);
  const condition = Matrix.isEqualTo(
    Matrix.ceil(r),
    numeric.ceil(r),
  );
  const test = (lib: any) => lib.ceil(r);
  startPerformanceTest(
    "ceil",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test,
      },
      numericjs: {
        instance: numeric,
        test,
      },
    },
  );
})();
