"use strict";
import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import numeric from "numericjs";
import { Matrix } from "../src/index.ts";
import { dimensions, startPerformanceTest } from "./utils.ts";

(async () => {
  const r1 = Matrix.uniqueRandom(
    dimensions[0] * 0.2,
    dimensions[1] * 0.2,
    10,
    100,
  );
  const r2 = Matrix.copy(r1);
  const a1 = [
    [0, 5, 22 / 3],
    [4, 2, 1],
    [2, 7, 9],
  ];
  const a2 = Matrix.copy(a1, "generic");
  const lu = [
    [4, 2, 1],
    [0.5, 6, 8.5],
    [0, 5 / 6, 0.25],
  ];
  const condition = Matrix.isEqualTo(
    Matrix.LUPC(a1).LU,
    numeric.LU(a2).LU,
  ) && Matrix.isEqualTo(
    Matrix.LUPC(r1).LU,
    numeric.LU(r2).LU,
  );
  const euriklisTest = (m: any) => m.LUPC(r1);
  const numericTest = (m: any) => m.LU(r2);
  startPerformanceTest(
    "LUPC",
    [{
      param: "matrix",
      dimensions: dimensions.map((el) => el / 1) as [number, number],
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
