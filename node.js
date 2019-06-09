class Node{
    constructor(posX, posY){
        this.posX = posX;
        this.posY = posY;
        this._id = posX.toString() + posY.toString();
    }
}