"use strict";

import { BST } from "../BST";
import { AVLDataNode } from "../DataNode";
import { InsertNodeInBST } from "../BST/Models";
import * as models from "./Models";
import type { Integer } from "../../Types";
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
    const n = new AVLDataNode(data);
    const node = InsertNodeInBST(this, n, id);
    // set the balance factors recursively for the all nodes of the tree.
     if (node) models.SetBalanceFactorsBackward(node, this);
    return this;
  }

  print(
    node: AVLDataNode | null = this._root,
    level: Integer = 0,
    prefix: string = "Root: ",
  ): void {
    if (node === null) {
      return;
    }
    console.log(" ".repeat(level * 2) + prefix + node.data + ` [${node.balance}]`);

    if (node.left) {
      this.print(node.left as AVLDataNode, level + 1, "L--> ");
    }

    if (node.right) {
      this.print(node.right as AVLDataNode, level + 1, "R--> ");
    }
  }
}
