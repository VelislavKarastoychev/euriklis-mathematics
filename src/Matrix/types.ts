export type Integer = number;
export type IntegerNumericType =
  | "int8"
  | "unsignedInt8"
  | "int16"
  | "unsignedInt16"
  | "int32"
  | "unsignedInt32";
export type FloatNumericType = "float32" | "float64";
export type NumericType = IntegerNumericType | FloatNumericType | "generic";
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
  type?: NumericType;
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
  | "bor"
  | "and"
  | "band";
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
  | "||"
  | "|"
  | "&&"
  | "&"
  | "<<"
  | ">>";
export type UnaryPointwiseOperator =
  | "neg"
  | "bneg"
  | "sin"
  | "cos"
  | "tan"
  | "cotan"
  | "sinh"
  | "cosh"
  | "tanh"
  | "cotanh"
  | "asinh"
  | "acosh"
  | "atanh"
  | "acotanh"
  | "exp"
  | "abs"
  | "arcsin"
  | "arccos"
  | "atan"
  | "acotan"
  | "sigmoid"
  | "round"
  | "ceil"
  | "sqrt"
  | "log"
  | "floor"
  | "ReLU"
  | "step"
  | "deepCopy"
  | "inverted";
export type InverseMethods =
  | "Gauss"
  | "LU"
  | "iterative Soleymani"
  | "iterative";
export type IterativeInversionInitialApproximationApproach =
  | "Pan and Schreiber"
  | "Ben - Israel and Greville"
  | "Grozz"
  | "Pan and Schreiber 2"
  | "Soleymani and TouTounian";
export type MapReduceExpression =
  | "rowSumAsRow"
  | "rowSumAsColumn"
  | "rowSumNoDiagAsRow"
  | "rowSumNoDiagAsColumn"
  | "colSumAsRow"
  | "colSumNoDiagAsRow"
  | "colSumAsColumn"
  | "colSumNoDiagAsColumn"
  | "rowNorm1AsRow"
  | "rowNorm1AsColumn"
  | "rowNorm1NoDiagAsRow"
  | "rowNorm1NoDiagAsColumn"
  | "colNorm1AsColumn"
  | "colNorm1AsRow"
  | "colNorm1NoDiagAsRow"
  | "colNorm1NoDiagAsColumn"
  | "rowSumSquaresAsRow"
  | "rowSumSquaresAsColumn"
  | "colSumSquaresAsRow"
  | "colSumSquaresAsRow"
  | "colSumSquaresAsColumn"
  | "rowSumSquaresNoDiagAsRow"
  | "rowSumSquaresNoDiagAsColumn"
  | "colSumSquaresNoDiagAsRow"
  | "colSumSquaresNoDiagAsColumn";
export type VectorToMatrixOperation =
  | "addRowVectorToMatrixByRowAxis"
  | "addRowVectorToMatrixByColAxis"
  | "addColVectorToMatrixByRowAxis"
  | "addColVectorToMatrixByColAxis"
  | "subtractRowVectorFromMatrixByRowAxis"
  | "subtractRowVectorFromMatrixByColAxis"
  | "subtractColVectorFromMatrixByRowAxis"
  | "subtractColVectorFromMatrixByColAxis"
  | "multiplyRowVectorToMatrixByRowAxis"
  | "multiplyRowVectorToMatrixByColAxis"
  | "multiplyColVectorToMatrixByRowAxis"
  | "multiplyColVectorToMatrixByColAxis"
  | "divideRowVectorToMatrixByRowAxis"
  | "divideRowVectorToMatrixByColAxis"
  | "divideColVectorToMatrixByRowAxis"
  | "divideColVectorToMatrixByColAxis";

export type ArithmeticOperatorSymbol = 
| "+" | "-" | "*" | "/" | "**" | "%" | "<<" | ">>";
