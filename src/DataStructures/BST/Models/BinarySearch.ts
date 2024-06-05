"use strict";
import type { BST } from "..";
import type { BSTNodeValueComparisonCallbackType } from "../../../Types";
import type { BSTDataNode } from "../../DataNode";

export const BinarySearchNode = (
  tree: BST,
  node: BSTDataNode | null,
  callback: (node: BSTDataNode, tree?: BST) => -1 | 0 | 1,
): BSTDataNode | null => {
  if (!node) return null;
  const comparison = callback(node, this);
  if (comparison < 0) {
    return BinarySearchNode(tree, node.left, callback);
  }
  if (comparison > 0) {
    return BinarySearchNode(tree, node.right, callback);
  }
  return node;
};

export const BinarySearch = (
  node: BSTDataNode | null,
  value: any,
  callback: BSTNodeValueComparisonCallbackType,
): BSTDataNode | null => {
  if (node) {
    const comparison = callback(node, value);
    if (comparison < 0) return BinarySearch(node.left, value, callback);
    else if (comparison > 0) return BinarySearch(node.right, value, callback);
    else return node;
  } else return null;
};
