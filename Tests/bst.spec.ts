"use strict";
import validator from "@euriklis/validator-ts";
import { BST } from "../src";

const tree = new BST();
tree.compare = (x, y) => x.data < y.data ? -1 : x.data === y.data ? 0 : 1;
tree.insert(1);
tree.insert(12);
tree.insert(10);
tree.insert(21);
tree.insert(9);
tree.insert(8);
const twelve = tree.rootNode?.right;
// const twentyOne = tree.rootNode?.right?.right;
console.log(twelve?.data);
// console.log(twentyOne?.data)
console.log(tree.successor(twelve?.prev));
tree.print();
console.log(
  tree.search((node) => node.data > 10 ? -1 : node.data === 10 ? 0 : 1),
);
console.log(tree.values());
