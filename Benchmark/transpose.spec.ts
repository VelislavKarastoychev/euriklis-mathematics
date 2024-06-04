"use strict";

import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import numeric from "numericjs";
import { Matrix } from "../src";
import { dimensions, startPerformanceTest } from "./utils";

(async () => {
  const m = numeric.random(dimensions);
  const condition = Matrix.isEqualTo(
    Matrix.transpose(m),
    numeric.transpose(m),
  );
  const test = (lib: any) => lib.transpose(m);
  startPerformanceTest(
    "transpose",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test
      },
      numericjs: {
        instance: numeric,
        test
      },
      // tensorFlowjs: {
      //   instance: tf,
      //   test
      // },
      // tensorFlowjsNode: {
      //   instance: tfNode,
      //   test
      // }
    }
  );
})();
