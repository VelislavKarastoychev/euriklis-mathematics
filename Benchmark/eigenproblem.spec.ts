"use strict";
import * as tf from "@tensorflow/tfjs";

import { Matrix } from "../src";
import numeric from "numericjs";
import { startPerformanceTest } from "./utils";
(async () => {
  const matrix = Matrix.random(100, 100,undefined, undefined, "generic");
  const condition = true;
  const euriklisTest = (m: any) => m.eigenproblem(Matrix.copy(matrix));
  const numericTest = (m: any) => m.eig(matrix);
  startPerformanceTest(
    "eigenvalues",
    [{ param: "matrix", dimensions: [100, 100], type: "float64" }],
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
