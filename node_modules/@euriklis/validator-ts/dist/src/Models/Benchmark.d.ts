import { BenchmarkCallback } from "../types.js";
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
export declare const Benchmark: (params: any, f: BenchmarkCallback, iterations: number) => {
    mean: number;
    std: number;
    iterations: number;
};
//# sourceMappingURL=Benchmark.d.ts.map