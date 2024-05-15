"use strict";
import numeric from "numericjs";
import validator from "@euriklis/validator-ts";
import { Matrix } from "../src";

// const matrix = [
//   [1, 2, 3, 4],
//   [5, 6, 7, 8],
//   [9, 10, 11, 12],
//   [13, 14, 5, 16]
// ];
const matrix = numeric.random([20, 20]);
const eig = Matrix.eigenproblem(Matrix.copy(matrix));
console.log(numeric.eig(Matrix.copy(matrix)).lambda)
console.log(eig.eigenvalues);
