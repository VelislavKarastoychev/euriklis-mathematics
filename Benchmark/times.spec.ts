"use strict";
import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import { Matrix } from "../src";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils";

(async () => {
  const m1r = Math.random() * 1000 | 0;
  const m1c = Math.random() * 1000 | 0;
  const m2c = Math.random() * 1000 | 0;
  const m1 = Matrix.uniqueRandom(m1r, m1c);
  const m2 = Matrix.uniqueRandom(m1c, m2c);
  const condition = Matrix.FrobeniusNorm(
    Matrix.minus(
      Matrix.times(m1, m2),
      numeric.dot(m1, m2),
    ),
  ) < 1e-8;
  const euriklisTest = (m: any) => m.times(m1, m2);
  const numericTest = (m: any) => m.dot(m1, m2);
  startPerformanceTest(
    "times",
    [{ param: "first matrix", dimensions: [m1r, m1c], type: "float64" }, {
      param: "second matrix",
      dimensions: [m1c, m2c],
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
