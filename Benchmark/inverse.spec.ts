"use strict";
import { Matrix } from "../src";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils";

(async () => {
  const a = Matrix.uniqueRandom(dimensions[0] / 10 | 0, dimensions[1] / 10 | 0);
  const condition = Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.inverse(a),
      numeric.inv(a),
    ),
  ) <= 1e-8;
  const euriklisTest = (m: any) => m.inverse(a);
  const numericTest = (m: any) => m.inv(a);
  startPerformanceTest(
    "inverse",
    [{
      param: "matrix",
      dimensions: [dimensions[0] / 10 | 0, dimensions[1] / 10 | 0],
      type: "float64",
    }],
    condition,
    euriklisTest,
    numericTest,
  );
})();
