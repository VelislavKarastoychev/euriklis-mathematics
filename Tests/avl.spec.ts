"use strict";
import validator from "@euriklis/validator-ts";
import { AVLTree } from "../src/DataStructures/AVL";

const tree = new AVLTree(4);
tree.unique = true;
tree.insert(3);
tree.insert(4);
tree.insert(22 / 7);
tree.insert(Math.sqrt(2));
tree.print();
