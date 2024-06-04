"use strict";

import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
import { dimensions, startPerformanceTest } from "./utils.ts";
import { Integer, NumericMatrix } from "../src/Matrix/types.ts";

(async () => {
  const m1 = Matrix.uniqueRandom(...dimensions);
  const from: [number, number] = [100, 101],
    to: [number, number] = [4990, 4999];
  // const t1 = numeric.clone(m1);
  // const t2 = tfNode.slice(t1, from, [
  //   to[0] - from[0] + 1,
  //   to[1] - from[1] + 1,
  // ]);
  const condition = Matrix.isEqualTo(
    Matrix.getBlock(m1, { from, to }),
    numeric.getBlock(m1, from, to),
  );
  // &&
  //   tf.equal(t2, numeric.getBlock(m1, from, to)).dataSync().every((
  //     el: Integer,
  //   ) => el === 1);
  const euriklisTest = (m: any) => m.getBlock(m1, { from, to });
  const numericTest = (m: any) => m.getBlock(m1, from, to);
  // const tfTest = (m: any) =>
  //   m.slice(t1, from, [to[0] - from[0] + 1, to[1] - from[1] + 1]);
  startPerformanceTest(
    "getBlock",
    [{
      param: "matrix",
      dimensions,
      type: "float64",
      from: [100, 101],
      to: [4990, 4999],
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
