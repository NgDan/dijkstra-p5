class Edge {
  constructor(node1, node2, weight) {
    this.node1 = node1;
    this.node2 = node2;
    this.weight = weight;
    // this.weight = Math.pow(Math.abs(node1.posX-node2.posX),2) + Math.pow(Math.abs(node1.posY-node2.posY),2);
  }
}
