"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";

const m = new Matrix();
const M = Array.from({ length: 37 }).map((_) =>
  Array.from({ length: 173 }).map((_) => 3.14)
);
m.M = M;

new validator(Matrix.replicate(3.14, 37, 173).isEqualTo(m))
  .describe("The replicate method has to:").test({
    title: true,
    success: "green",
    error: "red",
  })
  .isSame(true)
  .describe("1. creates a matrix with elements which are equal.").test()
  .and.bind(
    new validator((n: number, rows: number, columns: number) =>
      Matrix.replicate(n, rows, columns)
    ).throwsErrorWith(5, -12, 12),
  ).describe(
    "2. throws error when the rows or the columns are insufficiently defined",
  ).test()
  .describe(
    "3. Time performance of the replicate method for matrix with dimension 5000 x 5000",
  ).test()
  .on(true, () => {
    const t = new validator(Matrix).benchmark((m) =>
      m.replicate(3.14, 5000, 5000)
    );
    console.table(t);
  });
