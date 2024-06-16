"use strict";
import validator from "@euriklis/validator-ts";
import { AVLTree } from "../src/DataStructures/AVL";
import { BST } from "../src";

const tree = new AVLTree();
tree.search = (node, value) =>
  node.data === value ? 0 : node.data > value ? -1 : 1;
tree.unique = true;
tree.insert(4);
tree.insert(3);
tree.insert(5);
tree.insert(22 / 7);
tree.insert(Math.sqrt(2));
tree.insert(Math.sqrt(3));
tree.insert(1.41);
const n = tree.delete(Math.sqrt(2));
tree.print();
