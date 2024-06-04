"use strict";

import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const r = Matrix.uniqueRandom(...dimensions);
  const cr = Matrix.copy(r, "generic");
  const condition =
    Math.abs(
      Matrix.norm1(r) - numeric.sup(
        numeric.transpose(cr).map((m) => numeric.norm1(m)),
      ),
    ) < 1e-8;
  const euriklisTest = (m: any) => m.norm1(r);
  const numericTest = (m: any) =>
    m.sup(numeric.transpose(cr).map((row: number[]) => numeric.norm1(row)));
  // const tfTest = (m: any) => m.norm(cr, 1);
  startPerformanceTest(
    "norm1",
    [{ param: "matrix", dimensions, type: "float64" }],
    condition,
    {
      "@euruklis/mathematics": {
        instance: Matrix,
        test: euriklisTest,
      },
      numericjs: {
        instance: numeric,
        test: numericTest
      }
    }
  );
})();
