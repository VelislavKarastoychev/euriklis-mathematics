import type { DynamicStack } from "../../Stack";
import type { BSTDataNode } from "../../DataNode";
import type { BST } from "..";
export const CallDFS = (
  tree: BST,
  S: DynamicStack,
  callback: (node: BSTDataNode | null, tree: BST) => void,
): void => {
  if (S.isEmpty) return;
  const node: BSTDataNode = S.pop();
  if (node.right) S.push(node.right);
  if (node.left) S.push(node.left);
  callback(node, tree);

  return CallDFS(tree, S, callback);
};
