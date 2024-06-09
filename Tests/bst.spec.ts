"use strict";
import validator from "@euriklis/validator-ts";
import { BST } from "../src";

// example from the book of Manolis Loukakis,
// Data structures. Algorithms in greek.
// pp.404 - 420.

const SEARCH_VALUE = 25;
const DELETED_VALUE1 = 21;
const tree404 = new BST();
tree404.order = (x, y) => x.data < y.data ? -1 : x.data === y.data ? 0 : 1;
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
const searchValue = (v: number = SEARCH_VALUE) => tree404.binarySearch(v);
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
  .describe("9. provide methods for BFS and DFS traverse of the tree.")
  .test();

// testing of the successor and successor node methods.
// see example of the book Data structures and algorithms of
// Manolis Lukakis, pp.410.

const tree410 = new BST(53);
tree410.order = (x, y) => x.data < y.data ? -1 : x.data === y.data ? 0 : 1;
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
    "10. provide methods successor and predecessor, which computes the next minimal node which is greater than the underlined node.",
  ).test();

// testin g of the deletion of nodes in a BST.
// see Manolis Loukakis, Data structures. Algorithms.
// pp. 414.
const tree414 = new BST();

tree414.order = (x, y) => x.data < y.data ? -1 : x.data === y.data ? 0 : 1;
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
const tree414w21 = new BST();
tree414w21.order = (x, y) => x.data < y.data ? -1 : x.data === y.data ? 0 : 1;
tree414w21
  .insert(25)
  .insert(15)
  .insert(32)
  .insert(8)
  .insert(18)
  .insert(12)
  .insert(16)
  .insert(40)
  .insert(35)
  .insert(45);
const deleted21 = tree414.copy();
const d = deleted21.delete(DELETED_VALUE1);
const deletedNode21 = tree414.copy();
const dn = deletedNode21.deleteNode(
  (node) =>
    node.data > DELETED_VALUE1 ? -1 : node.data === DELETED_VALUE1 ? 0 : 1,
);
const tree414w32 = new BST();
tree414w32
  .order = (x, y) => x.data < y.data ? -1 : x.data === y.data ? 0 : 1;
tree414w32
  .insert(25)
  .insert(15)
  .insert(8)
  .insert(18)
  .insert(12)
  .insert(16)
  .insert(21)
  .insert(40)
  .insert(35)
  .insert(45);
const deleted32 = tree414.copy();
const d1 = deleted32.delete(32);
const deletedNode32 = tree414.copy();
const dn1 = deletedNode32.deleteNode((node) =>
  node.data === 32 ? 0 : node.data > 32 ? -1 : 1
);
const tree416 = new BST();
tree416.order = (x, y) => x.data < y.data ? -1 : x.data === y.data ? 0 : 1;
tree416
  .insert(30)
  .insert(20)
  .insert(42)
  .insert(26)
  .insert(35)
  .insert(47)
  .insert(23)
  .insert(29)
  .insert(45);
const deleted20 = tree416.copy();
const d2 = deleted20.delete(20);
const deletedNode20 = tree416.copy();
const dn2 = deletedNode20.deleteNode((node) =>
  node.data === 20 ? 0 : node.data > 20 ? -1 : 1
);
const tree416w20 = new BST();
tree416.order = (x, y) => x.data < y.data ? -1 : x.data === y.data ? 0 : 1;
tree416w20.insert(30)
  .insert(26)
  .insert(23)
  .insert(29)
  .insert(42)
  .insert(35)
  .insert(47)
  .insert(45);
const tree417 = new BST();
tree417.order = (x, y) => x.data < y.data ? -1 : x.data === y.data ? 0 : 1;
tree417.insertMany([30, 20, 35, 15, 32, 40, 10, 18, 34]);
const tree417w20 = new BST();
tree417w20.order = (x, y) => x.data < y.data ? -1 : x.data === y.data ? 0 : 1;
tree417w20.insertMany([30, 15, 35, 10, 18, 32, 40, 34]);
const deleted20FromTree417 = tree417.copy();
const d3 = deleted20FromTree417.delete(20);
const deletedNode20FromTree417 = tree417.copy();
const dn3 = deletedNode20FromTree417.deleteNode((node) =>
  node.data === 20 ? 0 : node.data > 20 ? -1 : 1
);
const deletedNode15 = new BST();
deletedNode15.order = (x, y) =>
  x.data < y.data ? -1 : x.data === y.data ? 0 : 1;
deletedNode15.insertMany([
  25,
  15,
  32,
  8,
  18,
  40,
  12,
  16,
  21,
  35,
  45,
  9,
  17,
  38,
]);
const dn4 = deletedNode15.deleteNode((node) =>
  node.data === 15 ? 0 : node.data > 15 ? -1 : 1
);
const deleted15 = new BST();
deleted15.order = (x, y) => x.data < y.data ? -1 : x.data === y.data ? 0 : 1;
deleted15.insertMany([25, 15, 32, 8, 18, 40, 12, 16, 21, 35, 45, 9, 17, 38]);
const d4 = deleted15.delete(15);
const tree414w15 = new BST();
tree414w15.order = (x, y) => x.data < y.data ? -1 : x.data === y.data ? 0 : 1;
const nodes = [
  25,
  32,
  16,
  40,
  18,
  8,
  45,
  35,
  21,
  17,
  12,
  38,
  9,
];
tree414w15.insertMany(nodes);
const filtered = tree414.filter((node) => node?.data > 15);
new validator(deleted21.isSame(tree414w21))
  .isSame(true)
  .and.bind(new validator(d).isSame(21))
  .and.bind(
    new validator(deletedNode21.isSame(tree414w21)).isSame(true),
  )
  .and.bind(new validator(dn?.data).isSame(21))
  .and.bind(
    new validator(deleted32.isSame(tree414w32)).isSame(true),
  )
  .and.bind(
    new validator(d1).isSame(32),
  )
  .and.bind(
    new validator(dn1?.data).isSame(32),
  )
  .and.bind(
    new validator(deleted20.isSame(tree416w20)).isSame(true),
  )
  .and.bind(
    new validator(dn2?.data).isSame(20),
  )
  .and.bind(
    new validator(d2).isSame(20),
  )
  .and.bind(
    new validator(deleted20FromTree417.isSame(tree417w20)).isSame(true),
  )
  .and.bind(
    new validator(deletedNode20FromTree417.isSame(tree417w20)).isSame(true),
  )
  .and.bind(
    new validator(d3).isSame(20).and.bind(new validator(dn3?.data).isSame(20)),
  )
  .and.bind(
    new validator(tree414w15.isSame(deleted15)).isSame(true),
  )
  .and.bind(
    new validator(d4).isSame(15).and.bind(new validator(dn4?.data).isSame(15)),
  )
  .and.bind(
    new validator(deletedNode15.isSame(tree414w15)).isSame(true),
  )
  .describe(
    "11. provide methods delete and deleteNode, which delete a node by its value using callback function.",
  )
  .test();

new validator(filtered.size).isSame(8)
  .describe(
    "12. provide a getter method size, which computes the count of all BST elements.",
  )
  .test();

new validator(tree414w15.toArray("BFS")).isSame(nodes)
  .describe(
    "13. provide a method toArray which collects the data of all nodes in an array with possible BFS and DFS modes.",
  )
  .test();
new validator(tree414.print).isFunction
  .describe(
    "14. provide a method print, which prints the binary search tree in the terminal.",
  )
  .test();
