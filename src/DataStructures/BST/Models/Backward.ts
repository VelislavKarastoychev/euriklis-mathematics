"use strict";
import type { BSTDataNode } from "../../DataNode";
export const RightBackward = (x: BSTDataNode | null): BSTDataNode | null => {
  if (x?.prev && (x === x?.prev?.right)) {
    return RightBackward(x.prev);
  } else if (!x?.prev && (x?.right)) return null;

  return x;
};

export const LeftBackward = (x: BSTDataNode | null): BSTDataNode | null => {
  if (x?.prev && (x === x?.prev?.left)) {
    return LeftBackward(x?.prev);
  } else if (!x?.prev && (x?.left)) return null;

  return x;
};
