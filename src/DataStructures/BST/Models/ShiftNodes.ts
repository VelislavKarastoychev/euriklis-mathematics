"use strict";

import type { BST } from "..";
import type { BSTDataNode } from "../../DataNode";

export const ShiftNodes = (
  tree: BST,
  u: BSTDataNode,
  v: BSTDataNode | null,
) => {
  if (!u?.prev) tree.root = v;
  else if (u === u.prev.left) u.prev.left = v;
  else u.prev.right = v;
  if (v) v.prev = u.prev;
};
