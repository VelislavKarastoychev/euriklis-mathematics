"use strict";
import validator from "@euriklis/validator-ts";
import { BST } from "../src";

// example from the book of Manolis Loukakis,
// Data structures. Algorithms in greek.
// pp.404 - 420.

const SEARCH_VALUE = 25;
const tree404 = new BST();
tree404.compare = (x, y) => x.data < y.data ? -1 : x.data === y.data ? 0 : 1;
tree404.insert(31);
tree404.insert(26);
tree404.insert(39);
tree404.insert(18);
tree404.insert(28);
tree404.insert(34);
tree404.insert(45);
tree404.insert(22);
tree404.insert(36);
tree404.insert(40);
tree404.insert(42);
tree404.insert(21);
tree404.insert(25);
// tree404.print();
const searchValue = (v: number = SEARCH_VALUE) =>
  tree404.binarySearch(v);
new validator(searchValue(1)).isSame(null)
  .and.bind(
    new validator(searchValue()).isSame(SEARCH_VALUE),
  ).describe("The BST data structure has to:")
  .test({ title: true, success: "green", error: "red" })
  .describe(
    "1. provide methods search and searchNode which to finds an element or a node (for the searchNode method) which satisfies given conditions or null if the current BST data structure does not contain such a node or element.",
  )
  .test();
new validator(!tree404.isEmpty)
  .isSame(true)
  .describe(
    "2. provide a method insert which ensures that the element will be put in the correct position of the BST.",
  )
  .test();

new validator(tree404.isSame(tree404.copy()))
  .isSame(true)
  .describe(
    "3. provide method copy, which copies the data and the ids of each node of the tree in a new BST data structure.",
  )
  .test()
  .and.bind(
    new validator(tree404.isSame(tree404.copy().insert(404)))
      .isSame(false),
  )
  .describe(
    "4. provide method isSame, which checks if the data and the ids of the current BST instance are equal with another BST instance.",
  )
  .test();

new validator(tree404.copy().clean().isEmpty)
  .isSame(true)
  .describe(
    "5. provide a method clean, which removes all the elements of the current BST data structure.",
  )
  .test()
  .describe(
    "6. provide a method isEmpty, which checks if the BST data structure is empty.",
  )
  .test();

new validator(tree404.min()).isSame(18)
  .and.bind(
    new validator(
      tree404.min(
        tree404.binarySearchNode((node) =>
          node.data === 39 ? 0 : node.data > 39 ? -1 : 1
        ),
      ),
    ).isSame(34),
  )
  .describe(
    "7. provide a method min which finds the smallest element if no argument is defined and the minimal element from a given node if the argument is defined correctly.",
  ).test();

const thirtyFour = tree404.binarySearchNode((n) =>
  n.data === 34 ? 0 : n.data > 34 ? -1 : 1
);
const thirtySix = tree404.binarySearchNode(
  (n) => n.data === 36 ? 0 : n.data > 36 ? -1 : 1,
);
new validator(tree404.copy().max()).isSame(45)
  .and.bind(
    new validator(
      tree404.copy().max(
        tree404.binarySearchNode((n) =>
          n.data === 34 ? 0 : n.data > 34 ? -1 : 1
        ),
      ),
    ).isSame(36),
  )
  .and.bind(
    new validator(tree404.maxNode(thirtyFour)?.data).isSame(36),
  )
  .describe(
    "8. provide methods max and maxNode which if are without parameter find the largest element of the tree and if a node s defined, then returns the maximal value from this node.",
  ).test();

const arr: any = [];
tree404.BFS((node) => arr.push(node?.data));
new validator(arr).isSame([31, 39, 26, 45, 34, 28, 18, 40, 36, 22, 42, 25, 21])
  .describe("9. provides a method for BFS traverse of the tree.")
  .test();

// testing of the successor and successor node methods.
// see example of the book Data structures and algorithms of
// Manolis Lukakis, pp.410.

const tree410 = new BST(53);
tree410.compare = (x, y) => x.data < y.data ? -1 : x.data === y.data ? 0 : 1;
tree410
  .insert(38)
  .insert(68)
  .insert(20)
  .insert(45)
  .insert(55)
  .insert(76)
  .insert(30)
  .insert(60)
  .insert(70)
  .insert(26)
  .insert(33)
  .insert(64)
  .insert(73);

new validator(tree410.successor()).isSame(55)
  .and.bind(
    new validator(tree410.successor(tree410.rootNode?.right?.right)).isSame(
      null,
    ),
  )
  .and.bind(
    new validator(tree410.successor(tree410.rootNode?.left?.left?.right?.right))
      .isSame(20)
      .on(false, (v) => console.log(v.value)),
  )
  .describe(
    "10. provide a method successor, which computes the next minimal node which is greater than the underlined node.",
  ).test();

// testin g of the deletion of nodes in a BST.
// see Manolis Loukakis, Data structures. Algorithms.
// pp. 414.
const tree414 = new BST();

tree414.compare = (x, y) => x.data < y.data ? -1 : x.data === y.data ? 0 : 1;
tree414
  .insert(25)
  .insert(15)
  .insert(32)
  .insert(8)
  .insert(18)
  .insert(40)
  .insert(12)
  .insert(16)
  .insert(21)
  .insert(35)
  .insert(45);
// tree414.delete(21);
// tree414.print();
