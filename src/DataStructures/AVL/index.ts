"use strict";

import { BST } from "../BST";
import { AVLDataNode } from "../DataNode";

export class AVLTree extends BST {
  constructor(data: any) {
    super(data);
  }

  get root(): any {
    return this._root?.data || null;
  }
  set root(data: any) {
    this._root = new AVLDataNode(data) as AVLDataNode;
  }

  set rootNode(node: AVLDataNode) {}


}
