"use strict";

import type { BST } from "..";
import type { BSTDataNode } from "../../DataNode";

export const SingleLeftRotation = <T extends BSTDataNode>(
  a: T,
  tree: BST<T>,
): void => {
  const b = a.right as T;
  if (a.prev) {
    if (a === a.prev.left) a.prev.left = b;
    else a.prev.right = b;
  } else tree.rootNode = b;

  b.prev = a.prev;
  a.prev = b;
  if (b.left) b.left.prev = a;
  a.right = b.left;
  b.left = a;
};
