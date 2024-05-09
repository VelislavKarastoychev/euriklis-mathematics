"use strict";
import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import { Matrix } from "../src";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils";

(async () => {
  const l1 = Matrix.randomLowerTriangular(
    dimensions[0] / 10,
    dimensions[1] / 10,
  );
  const l2 = Matrix.uniqueRandomLowerTriangular(
    dimensions[0] / 10,
    dimensions[1] / 10,
  );
  const tiny = 1e-8;

  const condition = Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.multiplyLL(l1, l2),
      numeric.dot(l1, l2),
    ),
  ) <= tiny;
  const euriklisTest = (m: any) => m.multiplyLL(l1, l2);
  const numericTest = (m: any) => m.dot(l1, l2);

  startPerformanceTest(
    "multiplyLL",
    [{ param: "lower triangular matrices", dimensions, type: "float64" }],
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
