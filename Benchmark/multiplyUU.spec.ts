"use strict";
import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import { Matrix } from "../src";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils";

(async () => {
  const u1 = Matrix.randomUpperTriangular(
    dimensions[0] / 10 | 0,
    dimensions[1] / 10 | 0,
  );
  const u2 = Matrix.uniqueRandomUpperTriangular(
    dimensions[0] / 10 | 0,
    dimensions[1] / 10 | 0,
  );
  const eps = 1e-8;
  const condition = Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.multiplyUU(u1, u2),
      numeric.dot(u1, u2),
    ),
  ) < eps;
  const euriklisTest = (m: any) => m.multiplyUU(u1, u2);
  const numericTest = (m: any) => m.dot(u1, u2);
  startPerformanceTest(
    "multiplyUU",
    [{
      param: "matrices",
      dimensions: [dimensions[0] / 10 | 0, dimensions[1] / 10 | 0],
      type: "float64",
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
