"use strict";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import { dimensions, startPerformanceTest } from "./utils.ts";
(async () => {
  const condition = Matrix.isEqualTo(
    Matrix.zeros(503, 503),
    numeric.rep([503, 503], 0),
  );
  const conditionGeneric = Matrix.isEqualTo(
    Matrix.zeros(501, 501, "generic"),
    numeric.rep([501, 501], 0),
  );
  const euriklisTest = (m: any) => m.zeros(dimensions[0], dimensions[1]);
  const euriklisTestGeneric = (m: any) =>
    m.zeros(dimensions[0], dimensions[1], "generic");
  const numericTest = (m: any) => m.rep(dimensions, 0);
  startPerformanceTest(
    "zeros and zero",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTest,
      },
      "numericjs": {
        instance: numeric,
        test: numericTest,
      },
    },
  );

  startPerformanceTest(
    "zeros and zero",
    [{ param: "matrix", dimensions, type: "generic" }],
    conditionGeneric,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTest,
      },
      "numericjs": {
        instance: numeric,
        test: numericTest,
      },
    },
  );
})();
