"use strict";

import validator from "@euriklis/validator-ts";
import { AVLTree, BST } from "../src";
import type {
  BSTNodeComparisonCallbackType,
  BSTNodeValueComparisonCallbackType,
} from "../src/Types";

const searchCallback: BSTNodeValueComparisonCallbackType = (node, value) =>
  node.data === value ? 0 : node.data > value ? -1 : 1;

const orderCallback: BSTNodeComparisonCallbackType = (x, y) =>
  x.data === y.data ? 0 : x.data < y.data ? -1 : 1;

const bst430 = new BST();
bst430.search = searchCallback;

bst430.order = orderCallback;
bst430.insertMany([30, 20, 45, 15, 26, 35, 60, 23, 33, 40, 50, 38]);

const tree430 = new AVLTree();
tree430.search = searchCallback;
tree430.order = orderCallback;

tree430.insertMany([30, 20, 45, 15, 26, 35, 60, 23, 33, 40, 50]);
tree430.insert(38);

const tree439 = new AVLTree();
tree439.search = searchCallback;
tree439.order = orderCallback;
tree439.insertMany([
  150,
  50,
  170,
  40,
  70,
  160,
  180,
  45,
  60,
  80,
  165,
  175,
  56,
  65,
  75,
  90,
  100,
]);

const bst439 = new BST();
bst439.order = orderCallback;
bst439.search = searchCallback;
bst439.insertMany([
  150,
  70,
  170,
  50,
  80,
  160, 
  180,
  40,
  60,
  75,
  90,
  165,
  175,
  45,
  56,
  65,
  100
]);

new validator(bst430.isSame(tree430)).isSame(true)
  .and.bind(
    new validator(bst439.isSame(tree439)).isSame(true)
  )
  .describe("The AVLTree library has to:")
  .test({ title: true, success: "green", error: "red" })
  .describe(
    "1. provide method insert and insertMany, which correctly add nodes to the tree and automatically set the balances of the nodes. Also rebalancing has to be performed.",
  )
  .test();
