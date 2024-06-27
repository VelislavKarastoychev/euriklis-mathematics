"use strict";
import type { AVLTree } from "../../DataStructures";
import type { BSTDataNode } from "../../DataStructures/DataNode";
import type { MatrixType, NumericMatrix, TypedArray } from "../Matrix";
export type BSTNodeComparisonCallbackType = <T extends BSTDataNode>(
  x: T,
  y: T,
) => -1 | 0 | 1;
export type BSTNodeValueComparisonCallbackType = <T extends BSTDataNode>(
  x: T,
  value: any,
) => -1 | 0 | 1;

export type GraphNodeType = {
  id: string;
  attributes: {
    value: number | TypedArray | number[] | MatrixType | NumericMatrix;
    [prop: string]: any;
  };
};

export type GraphEdgeType = {
  source: string;
  target: string;
  attributes: {
    width: number | TypedArray | number[] | MatrixType | NumericMatrix;
    [prop: string]: any;
  };
};

export type GraphEdgePartType = {
  id: string;
  attributes: {
    width: number | TypedArray | number[] | MatrixType | NumericMatrix;
    [prop: string]: any;
  };
};
export type GraphOptionsType = {
  nodes: GraphNodeType[];
  edges?: GraphEdgeType[];
};
