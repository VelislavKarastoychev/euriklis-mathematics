"use strict";

import type { BST } from "..";
import type { BSTDataNode } from "../../DataNode";
import type { Queue } from "../../Queue";

export const CallBFS = (
  tree: BST,
  Q: Queue,
  callback: (node: BSTDataNode, tree: BST) => void,
): void => {
  if (Q.isEmpty) return;
  const node: BSTDataNode = Q.dequeue();
  if (node.right) Q.enqueue(node.right);
  if (node.left) Q.enqueue(node.left);
  callback(node, tree);

  return CallBFS(tree, Q, callback);
};
