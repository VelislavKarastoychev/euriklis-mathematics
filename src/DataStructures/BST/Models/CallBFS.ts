"use strict";

import type { BST } from "..";
import type { BSTDataNode } from "../../DataNode";
import type { Queue } from "../../Queue";

export const CallBFS = <T extends BSTDataNode>(
  tree: BST<T>,
  Q: Queue,
  callback: (node: T, tree: BST<T>) => void,
): void => {
  if (Q.isEmpty) return;
  const node: BSTDataNode = Q.dequeue();
  if (node.right) Q.enqueue(node.right);
  if (node.left) Q.enqueue(node.left);
  callback(node as T, tree);

  return CallBFS(tree, Q, callback);
};
