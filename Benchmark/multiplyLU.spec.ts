"use strict";

import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import { Matrix } from "../src";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils";

(async () => {
  const l = Matrix.randomLowerTriangular(
    dimensions[0] / 10,
    dimensions[1] / 10,
  );
  const u = Matrix.uniqueRandomUpperTriangular(
    dimensions[0] / 10,
    dimensions[1] / 10,
  );
  const epsilon = 1e-8;
  const condition = Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.multiplyLU(l, u),
      numeric.dot(l, u),
    ),
  ) < epsilon;
  const euriklisTest = (m: any) => m.multiplyLU(l, u);
  const numericTest = (m: any) => m.dot(l, u);
  startPerformanceTest(
    "multiplyLU",
    [{
      param: "matrices",
      dimensions: [dimensions[0] / 10, dimensions[1] / 10],
      types: "float64",
    }],
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
