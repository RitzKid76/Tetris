class Ghost {
  constructor() {
    this.color = color(30, 30, 30);
    this.tiles = [];
  }
  
  setPosition(tiles) {
    this.setVoid();
    this.tiles = tiles;
  }
  
  draw() {
    for(let tile of this.tiles) {
      if(tile != null) {
        tile.setColor(this.color);
        tile.draw();
      }
    }
  }
  
  setVoid() {
    for(let tile of this.tiles) {
      if (tile != null && tile.void) {
        tile.setVoid();
      }
    }
  }
}