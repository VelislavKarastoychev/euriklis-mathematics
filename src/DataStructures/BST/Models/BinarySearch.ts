"use strict";
import type { BST } from "..";
import type { BSTNodeValueComparisonCallbackType } from "../../../Types";
import type { BSTDataNode } from "../../DataNode";

export const BinarySearchNode = <T extends BSTDataNode>(
  tree: BST<T>,
  node: T | null,
  callback: (node: T, tree?: BST<T>) => -1 | 0 | 1,
): T | null => {
  if (!node) return null;
  const comparison = callback(node, this);
  if (comparison < 0) {
    return BinarySearchNode(tree, node.left as T | null, callback);
  }
  if (comparison > 0) {
    return BinarySearchNode(tree, node.right as T | null, callback);
  }
  return node;
};

export const BinarySearch = <T extends BSTDataNode>(
  node: T | null,
  value: any,
  callback: BSTNodeValueComparisonCallbackType,
): T | null => {
  if (node) {
    const comparison = callback(node, value);
    if (comparison < 0) {
      return BinarySearch(node.left, value, callback) as T | null;
    } else if (comparison > 0) {
      return BinarySearch(node.right, value, callback) as T | null;
    } else return node;
  } else return null;
};
