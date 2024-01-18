import { types } from "util";

export type Integer = number;
export type IntegerNumericType =
  | "int8"
  | "unsignedInt8"
  | "int16"
  | "unsignedInt16"
  | "int32"
  | "unsignedInt32";
export type FloatNumericType = "float32" | "float64";
export type NumericType = IntegerNumericType | FloatNumericType;
export type NumericMatrix = number[][];
export type MatrixDeclaration = {
  M: NumericMatrix;
  type?: NumericType;
};
export type TypedArray =
  | Int8Array
  | Uint8Array
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array;
export type TypedArrayConstructor =
  | Int8ArrayConstructor
  | Uint8ArrayConstructor
  | Int16ArrayConstructor
  | Uint16ArrayConstructor
  | Int32ArrayConstructor
  | Uint32ArrayConstructor
  | Float32ArrayConstructor
  | Float64ArrayConstructor;

export type MatrixType = TypedArray[] | [];
export type MatrixBlockOptions = {
  from: [number, number];
  to: [number, number];
};

export type ComparisonParameter = "lt" | "gt" | "geq" | "leq" | "neq" | "eq";
export type ComparisonOperator = "===" | ">=" | "<=" | ">" | "<" | "!==";
export type MatrixReducer =
  | "inf"
  | "sup"
  | "norm1"
  | "infNorm"
  | "maxNorm"
  | "square"
  | "cube"
  | "any"
  | "all"
  | "sum"
  | "product";
export type BinaryPointwiseOperator =
  | "gt"
  | "geq"
  | "lt"
  | "leq"
  | "eq"
  | "neq"
  | "plus"
  | "minus"
  | "Hadamard"
  | "divide"
  | "modulus"
  | "power"
  | "xor"
  | "rightShiftBy"
  | "leftShiftBy"
  | "or"
  | "and";
export type BinaryOperator =
  | ">"
  | ">="
  | "<"
  | "<="
  | "=="
  | "!="
  | "+"
  | "-"
  | "*"
  | "/"
  | "%"
  | "**"
  | "^"
  | "|"
  | "&"
  | "<<"
  | ">>";
