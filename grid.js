class Grid {
    constructor(gridSize){
        this.gridSize = gridSize;
        this.nodes = [];
        //edges are stored in an object because it's faster to lookup
        this.edges = {};
        this.nodeSize = width/this.gridSize;  
    }

    addEdges(){
        if (this.nodes.length < 2){return}
        for(let i = 0; i < this.nodes.length; i++){
            for(let j = 0; j < this.nodes.length; j++){
                let edgeId = this.nodes[i]._id + this.nodes[j]._id;
                let reverseEdgeId = this.nodes[j]._id + this.nodes[i]._id;

                if(this.edges[edgeId] || this.edges[reverseEdgeId]){}
                else if(this.nodes[i] !== this.nodes[j]){
                    this.edges[edgeId] = new Edge(this.nodes[i],this.nodes[j]);

                }
            }
        }
    }

    addNode(x,y){
        let nodeAlreadyExists = false;
        if(this.nodes == []){
            this.nodes.push(new Node(x,y));
        }else{
        for(let i = 0; i < this.nodes.length; i++){
                if(this.nodes[i].posX == x && this.nodes[i].posY == y){
                nodeAlreadyExists = true;
            }
            }
            if (!nodeAlreadyExists){
                this.nodes.push(new Node(x,y));
            }
        }
        this.addEdges();
    }
    

    show(){
        //Draw grid lines
        for(let i=0; i<this.gridSize; i++){

            line(i*this.nodeSize-1,0,i*this.nodeSize-1,height);
            line(0,i*this.nodeSize-1,height,i*this.nodeSize-1);
        }
        for(let i = 0; i < this.nodes.length; i++){

            rect(this.nodes[i].posX,this.nodes[i].posY,this.nodeSize,this.nodeSize)
        }
        for (let i = 0; i < Object.keys(this.edges).length; i++){

            stroke('red')
            strokeWeight(3)
            line(
                this.edges[Object.keys(this.edges)[i]].node1.posX+this.nodeSize/2,
                this.edges[Object.keys(this.edges)[i]].node1.posY+this.nodeSize/2,
                this.edges[Object.keys(this.edges)[i]].node2.posX+this.nodeSize/2,
                this.edges[Object.keys(this.edges)[i]].node2.posY+this.nodeSize/2
                )
            strokeWeight(1)
            stroke('black')
        }
    }
}