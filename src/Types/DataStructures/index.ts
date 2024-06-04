"use strict";
import type { BSTDataNode } from "../../DataStructures/DataNode";
export type BSTNodeComparisonCallbackType = (
  x: BSTDataNode,
  y: BSTDataNode,
) => -1 | 0 | 1;
export type BSTNodeValueComparisonCallbackType = (
  x: BSTDataNode,
  value: any,
) => -1 | 0 | 1;
