"use strict";

import * as tf from "@tensorflow/tfjs";
import * as tfNode from "@tensorflow/tfjs-node";
import numeric from "numericjs";
import { Matrix } from "../src";
import { dimensions, startPerformanceTest } from "./utils";
(async () => {
  const m = numeric.random(dimensions);
  const m1 = numeric.clone(m)
  const condition = numeric.same(m, m1) && Matrix.isEqualTo(m, m1);
  const euriklisTest = (lib: any) => lib.isEqualTo(m, m1);
  const numericTest = (lib: any) => lib.same(m, m1);
  const tfTest = (lib: any) => lib.equal(m, m1);
  startPerformanceTest(
    "isEqualTo",
    [{ param: "matrices", dimensions, type: "generic" }],
    condition,
    {
      "@euriklis/mathematics": {
        instance: Matrix,
        test: euriklisTest
      },
      numericjs: {
        instance: numeric,
        test: numericTest
      },
      tensorFlowjs: {
        instance: tf,
        test: tfTest
      },
      tensorFlowjsNode: {
        instance: tfNode,
        test: tfTest
      }
    }
  );
})();
