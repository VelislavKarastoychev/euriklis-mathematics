"use strict";
import validator from "@euriklis/validator";
import { Matrix } from "../src/index.ts";
import { Integer } from "../src/Matrix/types.ts";
const generateIdentityLikeMatrix = (rows: Integer, columns: Integer) =>
  Matrix.identityLike(rows, columns);
new validator(Matrix.identityLike(15, 51).M)
  .describe("The identityLike and identity static methods:").test({
    title: true,
    success: "green",
    error: "red",
  })
  .describe(
    "1. Have to generates matrix with zero elements except for the diagonal elements which are equal to onces",
  )
  .forEvery((row, i) => {
    return row.forEvery((el, j) => {
      return el.isSame(0).and.bind(
        new validator(i).not.isSame(j),
      ).or.isSame(1);
    });
  })
  .and.isArrayOfIntegerArraysWithEqualSize
  .test()
  .describe(
    "2. Throws error if the rows or columns parameters are inappropriately declared.",
  )
  .and.bind(
    new validator(generateIdentityLikeMatrix)
      .throwsErrorWith(-10, 7)
      .and.throwsErrorWith(Math.E, 4)
      .and.throwsErrorWith(-2, 2)
      .and.not.throwsErrorWith(4, 3),
  ).test()
  .describe(
    "3. Time performance of the identity(Like) method with parameters rows = 5000 and columns = 5000",
  )
  .test()
  .on(true, () => {
    const benchmark = new validator(Matrix).benchmark((m) =>
      m.identityLike(5000, 5000)
    );
    console.table(benchmark);
  });
