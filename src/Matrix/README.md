# Matrix Library

A TypeScript library for mathematical computations with matrices.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This library provides a simple and efficient way to work with matrices in TypeScript. It includes utility functions for creating, initializing, and manipulating matrices, as well as basic matrix operations.

## Installation

```bash
npm install @euriklis/mathematics
```
To call the Matrix library you have to import the Matrix instance:

```js
import {Matrix} from "@euriklis/mathematics";  

```
#Usage

```js

import { Matrix } from '@euriklis/mathematics';

// Create a 3x3 matrix with random values between 0 and 1
const matrixA = Matrix.random(3, 3);

// Create a matrix with specified values
const matrixB = new Matrix({
  M: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ],
  type: 'float64',
});

// Perform matrix addition
const result = matrixA.plus(matrixB);

// Log the result
console.log(result.M);
```

# API

## Matrix class:
To initialize a matrix you have to call the constructor of the Matrix with an object with properties M and type.
The M property is the data of the matrix and the type defines the type of the matrix elements. There are 8 possible
types for every Matrix: `int8`, `unsignedInt8`, `int16`, `unsignedInt16`, `int32`, `unsignedInt32`, `float32` and `float64`.
Example:
```js
import {Matrix} from "@euriklis/mathematics";

 const m = new Matrix({
  M: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ],
  type: 'float64',
});
```
Now if we change the type to `int8` the matrix will be changed and represented as int8 digits.

To see the Matrix API and methods description visit the [documentation](./DOCUMENTATION.md) of Matrix library.
