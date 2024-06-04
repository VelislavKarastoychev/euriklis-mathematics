"use strict";

import validator from "@euriklis/validator-ts";
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
  Matrix.setBlock(mat48, {
    from: [1, 2],
    to: [2, 4],
  }, mat23),
)
  .describe("setBlock method has to:").test({
    title: true,
    success: "green",
    error: "red",
  })
  .describe("1. produce the correct result")
  .isSame(result)
  .test();

new validator(() =>
  Matrix.setBlock(mat48, {
    from: [3, 4],
    to: [2, 3],
  }, mat23)
).throwsErrorWith()
  .describe(
    "2. throw error when the from parameters are greater than the to",
  )
  .test();

new validator(() =>
  Matrix.setBlock(
    mat48,
    {
      from: [0, 0],
      to: [3, 3],
    },
    Array.from({ length: 20 }).map((_) =>
      Array.from({ length: 10 }).map(Math.random)
    ),
  )
).throwsErrorWith()
  .describe(
    "3. Has to throw error when the block is incorrectly defined (with dimensions that don't correspond to the 'from' and 'to' parameters)",
  )
  .test();
