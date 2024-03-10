"use strict";
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
  const eps = 1e-8;
  const condition = Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.multiplyUL(u, l),
      numeric.dot(u, l),
    ),
  ) < eps;
  const euriklisTest = (m: any) => m.multiplyUL(u, l);
  const numericTest = (m: any) => m.dot(u, l);
  startPerformanceTest(
    "multiplyUL",
    [{
      param: "matrices",
      dimensions: [dimensions[0] / 10, dimensions[1] / 10],
      type: "float64",
    }],
    condition,
    euriklisTest,
    numericTest,
  );
})();
