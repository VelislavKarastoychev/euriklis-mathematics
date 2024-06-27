"use strict";

import type {
  GraphEdgePartType,
  GraphEdgeType,
  GraphNodeType,
  GraphOptionsType,
  Integer,
} from "../../Types";
import { AVLTree } from "../AVL";

type EGraphNodeType = GraphNodeType & {
  inputs: AVLTree;
  outputs: AVLTree;
};

export class Graph {
  private __G__: AVLTree = new AVLTree();

  constructor(G: GraphOptionsType) {
    this.nodes = G.nodes;
    this.edges = G.edges;
  }

  get nodes(): GraphNodeType[] {
    const V: GraphNodeType[] = [];
    this.__G__.BFS((node) => {
      const { id, attributes } = node.data as GraphNodeType;
      V.push({ id, attributes });
    });

    return V;
  }

  set nodes(nodes: GraphNodeType[] | undefined) {
    if (nodes) {
      this.__G__.insertMany(nodes);
    }
  }

  get edges(): GraphEdgeType[] {
    const E: GraphEdgeType[] = [];
    this.__G__.BFS((source) => {
      const sourceData = source.data as EGraphNodeType;
      const sourceId = sourceData.id;
      const outputs = sourceData.outputs;
      outputs.BFS((target) => {
        const targetData = target.data as GraphEdgePartType;
        const targetId = targetData.id;
        E.push({
          source: sourceId,
          target: targetId,
          attributes: targetData.attributes,
        });
      });
    });

    return E;
  }

  set edges(edges: GraphEdgeType[] | undefined) {
    if (edges) {
      const G = this.__G__, m = edges.length;
      let i: Integer;
      for (i = m; i--;) {
        const { source, target, attributes } = edges[i];
        const s = G.binarySearchNode((node) =>
          node.id === source ? 0 : node.id > source ? -1 : 1
        )?.data as EGraphNodeType;
        const t = G.binarySearchNode((node) =>
          node.id === target ? 0 : node.id > target ? -1 : 1
        )?.data as EGraphNodeType;
        if (!s || !t) throw new Error("Incorrect nodes in edge pair.");
        s.outputs.insert({ id: target, attributes });
        t.inputs.insert({ id: source, attributes });
      }
    }
  }
}
