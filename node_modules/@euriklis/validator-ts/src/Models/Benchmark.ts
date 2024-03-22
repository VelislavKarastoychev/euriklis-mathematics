"use strict";

import { BenchmarkCallback, Integer } from "../types";

/**
 * @callback {BenchmarkCallback}
 * @param {any} parameters
 * @description a benchmark function which will be executed
 * in order to be computed their performance.
 */
/**
 * Utility function for the benchmark method.
 *
 * @param {any} params - the current validator
 * value which will be passed as argument in the
 * benchmark callback function.
 * @param {BenchmarkCallback} f - a function which will be
 * executed "iteration" times.
 * @param {number} iterations - a positive integer which represents
 * the number of the iterations.
 * @returns {mean: number, std: number, iterations: number} an object with properties mean,
 * std and iterations.
 */
export const Benchmark = (
  params: any,
  f: BenchmarkCallback,
  iterations: number,
): { mean: number; std: number; iterations: number } => {
  let i: Integer, dt1: number, dt2: number, times: number[] = [];
  for (i = iterations; i--;) {
    dt1 = performance.now();
    f(params);
    dt2 = performance.now();
    times.push(dt2 - dt1);
  }
  // compute the mean (average) time performance:
  const mean: number = times.reduce((m, value) => m + value, 0) / iterations;
  // compute the standard deviation:
  const dispersion: number = times.reduce((sigma, value) => {
    const diff: number = value - mean;
    return sigma + diff * diff;
  }, 0);
  const std: number = Math.sqrt(dispersion / (iterations - 1));

  return { mean, std, iterations };
};
