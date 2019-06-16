class Node{
    constructor(posX, posY, isStart, isEnd){
        this._id = posX.toString() + posY.toString();
        this.isStart = isStart;
        this.isEnd = isEnd;
        this.posX = posX;
        this.posY = posY;
        this.shortestDistFromStart = this.isStart ? 0 : 'infinity';
    }
}