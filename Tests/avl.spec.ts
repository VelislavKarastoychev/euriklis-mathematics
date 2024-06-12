"use strict";
import validator from "@euriklis/validator-ts";
import { AVLTree } from "../src/DataStructures/AVL";

const tree = new AVLTree(4);
tree.insert(3);
tree.insert(4);
tree.print();
