class PieceDisplay extends Display {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.tiles = this.generateDisplay();
    this.generateTiles();
  }
  
  draw() {
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
    for(let tile in this.tiles) {
      tile.draw();
    }
  }
}