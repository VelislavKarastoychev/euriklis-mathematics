"use strict";

import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils.ts";
(async () => {
  const r1 = Matrix.uniqueRandom(dimensions[0], dimensions[1], 1, 200);
  const r2 = Matrix.uniqueRandom(dimensions[0], dimensions[1], 2, 10, "int8");
  const condition = Matrix.isEqualTo(
    Matrix.modulus(r1, r2),
    numeric.mod(r1, r2),
  );
  const euriklisTest = (m: any) => m.modulus(r1, r2);
  const numericTest = (m: any) => m.mod(r1, r2);
  startPerformanceTest(
    "modulus",
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
