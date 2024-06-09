"use strict";

import { BST } from "../BST";
import { AVLDataNode } from "../DataNode";

export class AVLTree extends BST {
  constructor(data: any) {
    super(data);
  }

  set root(data: any) {
    this._root = new AVLDataNode(data);
  }
}
