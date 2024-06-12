"use strict";
import type { BSTDataNode } from "../../DataStructures/DataNode";
export type BSTNodeComparisonCallbackType = <T extends BSTDataNode>(
  x: T,
  y: T,
) => -1 | 0 | 1;
export type BSTNodeValueComparisonCallbackType = <T extends BSTDataNode>(
  x: T,
  value: any,
) => -1 | 0 | 1;
