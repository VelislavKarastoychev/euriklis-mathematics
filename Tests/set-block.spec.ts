"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";

const mat48 = [
  [1, 2, 3, 4, 5, 6, 7, 8],
  [1, 2, 3, 4, 5, 6, 7, 8],
  [1, 2, 3, 4, 5, 6, 7, 8],
  [1, 2, 3, 4, 5, 6, 7, 8],
];

const mat23 = [
  [Math.PI, Math.E, Math.sin(2)],
  [Math.PI, Math.E, Math.sin(2)],
];

const result = [
  [1, 2, 3, 4, 5, 6, 7, 8],
  [1, 2, Math.PI, Math.E, Math.sin(2), 6, 7, 8],
  [1, 2, Math.PI, Math.E, Math.sin(2), 6, 7, 8],
  [1, 2, 3, 4, 5, 6, 7, 8],
];
new validator(
  new Matrix(mat48).setBlock({
    from: [1, 2],
    to: [2, 4],
    block: mat23,
  }).M,
)
  .describe("setBlock method:").test({
    title: true,
    success: "green",
    error: "red",
  })
  .describe("1. Has to produce the correct result")
  .isSame(result)
  .test();

new validator(() =>
  new Matrix(mat48).setBlock({
    from: [3, 4],
    to: [2, 3],
    block: mat23,
  })
).throwsErrorWith()
  .describe(
    "2. Has to throw error when the from parameters are greater than the to",
  )
  .test();

new validator(() =>
  new Matrix(mat48).setBlock({
    from: [0, 0],
    to: [3, 3],
    block: Array.from({ length: 20 }).map((_) =>
      Array.from({ length: 10 }).map(Math.random)
    ),
  })
).throwsErrorWith()
  .describe(
    "3. Has to throw error when the block is incorrectly defined (with dimensions that don't correspond to the 'from' and 'to' parameters)"
  )
  .test();
