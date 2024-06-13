"use strict";

import { BST } from "../BST";
import { AVLDataNode } from "../DataNode";
import * as models from "../BST/Models";
export class AVLTree extends BST<AVLDataNode> {
  constructor(data: any) {
    super(data);
  }

  get root(): any {
    return this._root?.data || null;
  }
  set root(data: any) {
    this._root = new AVLDataNode(data) as AVLDataNode;
  }

  insert(data: any, id?: string) {
    if (data?.id) id = data.id;
    const node = models.InsertNodeInBST(this, data, id) as AVLDataNode;
    // set the initial balance of the node.
    node.balance = 0;

    return this;
  }
}
