"use strict";

import {
  ComparisonOperator,
  ComparisonParameter,
  Integer,
  MatrixType,
  NumericMatrix,
  TypedArray,
} from "../types";

const ObtainOperator = (
  operator: ComparisonParameter,
): ComparisonOperator => {
  switch (operator) {
    case "eq":
      return "===";
    case "leq":
      return "<=";
    case "lt":
      return "<";
    case "gt":
      return ">";
    case "geq":
      return ">=";
    case "neq":
      return "!==";
    default:
      return "===";
  }
};

const CompareMatricesIterator = (
  a: MatrixType | NumericMatrix | TypedArray,
  b: MatrixType | NumericMatrix | TypedArray,
  operator: ComparisonOperator,
  it: Integer = 0,
): boolean => {
  let answer: boolean = true;
  let j: Integer;
  if (!it) {
    const n = a.length;
    for (j = n; j--;) {
      answer = CompareMatricesIterator(
        a[j] as TypedArray,
        b[j] as TypedArray,
        operator,
        it + 1,
      );
      if (!answer) return answer;
    }

    return answer;
  } else {
    const comparison = Function(
      "a,b",
      `const n = a.length;
       let i;
       for(i = 0;i < n >> 2;i++) {
         j = i << 2;
         if (
           !(a[j] ${operator} b[j]) || 
           !(a[j + 1] ${operator} b[j + 1]) ||
           !(a[j + 2] ${operator} b[j + 2]) ||
           !(a[j + 3] ${operator} b[j + 3])
         ) return false;
       }
       
       for (j = i << 2;j < n;j++) {
         if (!(a[j] ${operator} b[j])) return false;    
       }
      
       return true;
      `,
    )(a, b);
    return comparison;
  }
};

export const CompareMatrices = (
  a: MatrixType | NumericMatrix,
  b: MatrixType | NumericMatrix,
  operator: ComparisonParameter,
): boolean => {
  const obtainedOperator = ObtainOperator(operator);
  return CompareMatricesIterator(a, b, obtainedOperator);
};
