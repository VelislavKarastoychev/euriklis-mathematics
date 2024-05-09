"use strict";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src/index.ts";
import numeric from "numericjs";
import { Integer } from "../src/Matrix/types.ts";
type ParamsType = Array<
  {
    param: string;
    dimensions?: [number, number];
  } & { [key: string]: any }
>;
const paramsDescription = (
  params: ParamsType,
) => {
  const message = params.map((p) => {
    const keys = Object.keys(p).filter((key) =>
      key !== "param" && key !== "dimensions"
    );
    let summary = "";
    summary += p.param + " ";
    if (p.dimensions) summary += p.dimensions.join(" x ");
    summary += ", " +
      keys.map((key) => `${key} --> ${p[key].toString()}`).join(", ");

    return summary;
  });

  return message.join(" ");
};
export const startPerformanceTest = (
  method: string,
  params: ParamsType,
  condition: boolean,
  libraries: {
    [library: string]: { instance: Object; test: (_: any) => any };
  } = {
    "@euriklis/mathematics": { instance: Matrix, test: (_: any) => {} },
    "numericjs": { instance: numeric, test: (_: any) => {} },
  },
  iterations: Integer = 100,
) => {
  new validator(condition).isSame(true)
    .on(true, (v) => {
      v.describe(
        `Time performance of ${method} method with parameters: ${
          paramsDescription(params)
        }`,
      )
        .test({
          title: true,
          success: "green",
          error: "red",
        });
      let lib: string,
        ti: { mean: number; std: number; iterations: Integer },
        result: {
          [library: string]: { mean: number; std: number; iterations: Integer };
        } = {};
      for (lib in libraries) {
        ti = new validator(libraries[lib].instance).benchmark(
          libraries[lib].test,
          iterations,
        );
        result[lib] = ti;
      }
      console.info(result);
    }).on(false, (v) => {
      v.describe(`Internal error in ${method} benchmark test method.`)
        .test({
          title: true,
          error: "red",
          success: "green",
        });
    });
};

export const dimensions: [number, number] = [5000, 5000];
