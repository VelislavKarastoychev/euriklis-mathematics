"use strict";
import numeric from "numericjs";
import { Matrix } from "../src";
import type { MatrixType, NumericMatrix } from "../src/Types";
import { dimensions, startPerformanceTest } from "./utils";
import * as tfNode from "@tensorflow/tfjs-node";
import * as tf from "@tensorflow/tfjs";
(async () => {
  const r = Matrix.random(2, 3);
  const r1 = Matrix.copy(r);
  r1[1][2] = Math.PI;
  const c1 = !Matrix.isEqualTo(r, r1);
  const n = Matrix.copy(r, "generic");
  const n1 = Matrix.copy(n, "generic");
  n1[1][2] = Math.PI;
  const c2 = !Matrix.isEqualTo(n, n1);
  let m1: MatrixType | NumericMatrix, m2: MatrixType | NumericMatrix;
  m1 = Matrix.random(...dimensions);
  m2 = Matrix.random(dimensions[0], dimensions[1], 0, 1, "generic");
  const euriklisTest = (m: any) => m.copy(m1);
  const numericTest = (m: any) => m.clone(m2);
  const tfTest = (m: any) => m.clone(m2);
  startPerformanceTest(
    "copy",
    [{ param: "matrix", dimensions, type: "float64" }],
    c1 && c2,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTest,
      },
      numeric: {
        instance: numeric,
        test: numericTest,
      },
      tensorFlowjs: {
        instance: tf,
        test: tfTest,
      },
      tensorFlowjsNode: {
        instance: tfNode,
        test: tfTest,
      },
    },
  );
  Matrix.setType("generic");
  startPerformanceTest(
    "copy",
    [{ param: "matrix", dimensions, type: "generic" }],
    c1 && c2,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTest,
      },
      numeric: {
        instance: numeric,
        test: numericTest,
      },
      tensorFlowjs: {
        instance: tf,
        test: tfTest,
      },
      tensorFlowjsNode: {
        instance: tfNode,
        test: tfTest,
      },
    },
  );
})();
