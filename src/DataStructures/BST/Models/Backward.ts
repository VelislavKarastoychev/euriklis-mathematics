"use strict";
import type { BSTDataNode } from "../../DataNode";
export const Backward = (x: BSTDataNode | null): BSTDataNode | null => {
  if (x?.prev && (x === x?.prev?.right)) {
    return Backward(x.prev);
  } else if (!x?.prev && (x?.right)) return null;

  return x;
};
