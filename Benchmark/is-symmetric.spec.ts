"use strict";
import numeric from "numericjs";
import { Matrix } from "../src";
import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import { dimensions, startPerformanceTest } from "./utils";

(async () => {
  const a = Matrix.random(...dimensions);
  const square = numeric.mul(numeric.add(a, numeric.transpose(a)), 0.5);
  const condition = Matrix.isMatrix(square) &&
    Matrix.isSquare([[2, 2], [2, 2]]);
  const euriklisTest = (m: any) => m.isSymmetric(square);
  const numericTest = (m: any) => m.same(numeric.transpose(square), square);
  const tfTest = (m: any) => {
    m.equal(m.transpose(square), square);
  };
  startPerformanceTest(
    "isSymmetric",
    [{ param: "matrix", dimensions, type: "float64" }],
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
      // tensorFlowjs: {
      //   instance: tf,
      //   test: tfTest,
      // },
      // tensorFlowjsNode: {
      //   instance: tfNode,
      //   test: tfTest,
      // },
    },
  );
})();
