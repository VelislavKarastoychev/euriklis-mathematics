import type { DynamicStack } from "../../Stack";
import type { BSTDataNode } from "../../DataNode";
import type { BST } from "..";
export const CallDFS = <T extends BSTDataNode>(
  tree: BST<T>,
  S: DynamicStack,
  callback: (node: T, tree: BST<T>) => void,
): void => {
  if (S.isEmpty) return;
  const node: T = S.pop();
  if (node.right) S.push(node.right);
  if (node.left) S.push(node.left);
  callback(node, tree);

  return CallDFS(tree, S, callback);
};
