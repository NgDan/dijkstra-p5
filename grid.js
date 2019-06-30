class Grid {
  constructor(gridSize, radius, startNode = null, endNode = null) {

    this.gridSize = gridSize;

    this.nodes = [];
    //edges are stored in an object instead of array because it's faster to lookup
    this.edges = {};

    this.startNode = startNode;

    this.endNode = endNode;

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
        let node = new Node(x, y, isStart, isEnd)
        this.nodes.push(node);
        if(isStart){
          this.startNode = node;
        }
        else if (isEnd){
          this.endNode = node
        }
      }
    }
    this.connectNodesWithinRadius(this.radius);
    document.querySelector('.nodes').innerHTML = ': ' + this.nodes.length;
    document.querySelector('.edges').innerHTML = ': ' + Object.keys(this.edges).length;
   
  }

  dijkstra(){

    let currentNode = this.startNode;

    grid.unvisitedNodes = this.nodes;
    
    console.log(this.edges)

    const getNeighbours = (node) => {
      if(node !== null) {
        return Object.keys(this.edges).filter((edge)=>{
          return this.edges[edge].node1 === node || this.edges[edge].node2 === node;
        }).map((key)=>{
            if(this.edges[key].node1 === node){
              return this.edges[key].node2
            }else{
              return this.edges[key].node1
            }
        })
      }else{
        return null;
      }
    }


    for (let i = 0; i < grid.unvisitedNodes.length; i++){
      let neighbours = getNeighbours(currentNode);

      for (let i = 0; i < neighbours.length; i++){
        // get distance between current node and iterated neighbour
        let distance = currentNode.shortestDistFromStart + this.distanceBetweenNodes(neighbours[i], currentNode);

        if(neighbours[i].shortestDistFromStart === 'infinity' || neighbours[i].shortestDistFromStart > distance){
          this.edges[neighbours[i]._id].shortestDistFromStart = distance;
          this.edges[neighbours[i]._id].previousNode = currentNode;
        }

      }
    }
    console.log(this.edges )

  }

  show() {
    //Draw grid lines
    for (let i = 0; i < this.gridSize; i++) {
      line(i * this.nodeSize - 1, 0, i * this.nodeSize - 1, height);
      line(0, i * this.nodeSize - 1, height, i * this.nodeSize - 1);
    }
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].isStart){

        fill('green');
        rect(
          this.nodes[i].posX,
          this.nodes[i].posY,
          this.nodeSize,
          this.nodeSize
        );
        fill('white');
      }

      else if(this.nodes[i].isEnd){
        fill('red')
        rect(
          this.nodes[i].posX,
          this.nodes[i].posY,
          this.nodeSize,
          this.nodeSize
        );
        fill('white');
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
  
}
