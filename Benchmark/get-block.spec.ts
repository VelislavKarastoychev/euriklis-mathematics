"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";

const dimensions: [number, number] = [6000, 6000],
  from: [number, number] = [100, 101],
  to: [number, number] = [5001, 5100];
(async () =>
  new validator(true).isBoolean
    .describe(
      `getBlock method time performance with parameters matrix -> ${
        dimensions[0]
      } x ${dimensions[1]}, from = ${from}, to = ${to}:`,
    )
    .on(true, () => {
      const m = Matrix.random(...dimensions);
      const t1 = new validator(m)
        .benchmark((matrix) =>
          matrix.getBlock({ from, to })
        );
      
      const t2 = new validator(m.M).benchmark((matrix) => {
        return numeric.getBlock(matrix, from, to);
      });

      console.table({ "@euriklis/mathematics": t1, "numericjs": t2 });
    }))();
