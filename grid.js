class Grid {
  constructor(gridSize, radius, hasStartNode, hasEndNode) {

    this.gridSize = gridSize;

    this.nodes = [];
    //edges are stored in an object instead of array because it's faster to lookup
    this.edges = {};

    this.hasStartNode = hasStartNode

    this.hasEndNode = hasEndNode

    this.unvisitedNodes = []

    this.visitedNodes = []

    this.nodeSize = width / this.gridSize;

    this.radius = Math.pow(radius * this.nodeSize, 2);
  }

  distanceBetweenNodes(node1, node2) {
    return (
      Math.pow(Math.abs(node1.posX - node2.posX), 2) +
      Math.pow(Math.abs(node1.posY - node2.posY), 2)
    );
  }

  connectNodesWithinRadius(radius) {
    if (this.nodes.length < 2) {
      return;
    }
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = 0; j < this.nodes.length; j++) {
        let edgeId = this.nodes[i]._id + this.nodes[j]._id;
        let reverseEdgeId = this.nodes[j]._id + this.nodes[i]._id;
        let weight = this.distanceBetweenNodes(this.nodes[i], this.nodes[j]);

        // check if this edge is in the object already
        if (this.edges[edgeId] || this.edges[reverseEdgeId]) {
          console.log("same!");
        }

        // if it's not present, check if the edge is not connected to the same node and
        // also check if the other node is withing the radius
        else if (this.nodes[i] !== this.nodes[j] && weight < radius) {
          this.edges[edgeId] = new Edge(this.nodes[i], this.nodes[j], weight);
        }

        if (
          typeof this.edges[edgeId] !== "undefined" &&
          this.edges[edgeId].weight > radius
        ) {
          delete this.edges[edgeId];
        }
      }
    }
  }

  addNode(x, y, isStart=false, isEnd=false) {
    let nodeAlreadyExists = false;
    if (this.nodes == []) {
      this.nodes.push(new Node(x, y, isStart, isEnd));
    } else {
      for (let i = 0; i < this.nodes.length; i++) {
        if (this.nodes[i].posX == x && this.nodes[i].posY == y) {
          nodeAlreadyExists = true;
        }
      }
      if (!nodeAlreadyExists) {
        this.nodes.push(new Node(x, y, isStart, isEnd));
      }
    }
    this.connectNodesWithinRadius(this.radius);
    document.querySelector('.nodes').innerHTML = ': ' + this.nodes.length;
    document.querySelector('.edges').innerHTML = ': ' + Object.keys(this.edges).length;
   
  }

  show() {
    //Draw grid lines
    for (let i = 0; i < this.gridSize; i++) {
      line(i * this.nodeSize - 1, 0, i * this.nodeSize - 1, height);
      line(0, i * this.nodeSize - 1, height, i * this.nodeSize - 1);
    }
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].isStart){

        fill('green')
        rect(
          this.nodes[i].posX,
          this.nodes[i].posY,
          this.nodeSize,
          this.nodeSize
        );

      }

      else if(this.nodes[i].isEnd){
        fill('red')
        rect(
          this.nodes[i].posX,
          this.nodes[i].posY,
          this.nodeSize,
          this.nodeSize
        );
      }
      else{
        fill('white')
        rect(
          this.nodes[i].posX,
          this.nodes[i].posY,
          this.nodeSize,
          this.nodeSize
        );
      }
    }
    for (let i = 0; i < Object.keys(this.edges).length; i++) {
      stroke("red");
      strokeWeight(3);
      line(
        this.edges[Object.keys(this.edges)[i]].node1.posX + this.nodeSize / 2,
        this.edges[Object.keys(this.edges)[i]].node1.posY + this.nodeSize / 2,
        this.edges[Object.keys(this.edges)[i]].node2.posX + this.nodeSize / 2,
        this.edges[Object.keys(this.edges)[i]].node2.posY + this.nodeSize / 2
      );
      strokeWeight(1);
      stroke("black");
    }
  }

  dijkstra(){

  }
}
