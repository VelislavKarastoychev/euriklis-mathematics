"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";

const randomMatrix = new validator(
  Matrix.random(3, 3, -1, 1, "float64", 123456),
);

randomMatrix.copy()
  .describe("The euriklis Mathematics Matrix has to produce a matrix")
  .isInstanceof(Matrix)
  .test()
  .and.bind(
    new validator(() => randomMatrix.copy().value.M)
      .executeWith()
      .isArrayOfNumberArraysWithEqualSize,
  ).describe(
    "The Matrix.random() has to be a static method and to generate random matrix with numbers form - to 1",
  ).test()
  .on(true, () => {
    new validator(Matrix).isInstanceof(Object)
      .describe("A random matrix from 500x5000 elements is created for:")
      .test()
      .on(true, (v) => {
        const benchmark = v.benchmark((v) => v.random(5000, 5000));
        console.table(benchmark);
      });
  });
