class Board {
  constructor(xsize, ysize, xpos, ypos) {
    this.width = xsize;
    this.height = ysize;
    this.x = xpos;
    this.y = ypos;
    this.tiles = this.generateBoard();
    this.generateTiles();
    this.clearedLines = 0;
    this.piece = new Piece(5, 0, this);
  }

  generateBoard() {
    let board = [];
    for (let y = 0; y < this.height; y++) {
      board[y] = new Array(this.width);
      for (let x = 0; this.x < this.width; x++) {
        board[y][x] = null;
      }
    }
    return board;
  }

  generateTiles() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.tiles[y][x] = new Tile(x, y, this.x, this.y);
        this.tiles[y][x].setScale(height / this.height);
      }
    }
  }

  baseDraw() {
    fill(10, 10, 10);
    let scale = height / this.height;
    rect(this.x, this.y, this.width * scale, height);
    for (let col of this.tiles) {
      for (let tile of col) {
        tile.draw();
      }
    }
  }

  draw() {
    this.baseDraw();
    this.lineClear();
    this.piece.draw();
    this.checkForLoss();
  }

  getTile(x, y) {
    if (0 <= x && x <= this.width - 1 && 0 <= y && y <= this.height - 1) {
      return this.tiles[y][x];
    }
    return null;
  }

  lineClear() {
    for (let i = this.height - 1; i >= 0; i--) {
      let solid = true;
      for (let tile of this.tiles[i]) {
        if (tile.void) {
          solid = false;
          break;
        }
      }
      if (solid) {
        this.piece.fallTimeReset *= 0.8;
        this.clear(i);
        this.clearedLines++;
      }
    }
  }

  clear(lineIndex) {
    if (lineIndex != 0) {
      for (let y = lineIndex; y > 0; y--) {
        for (let x in this.tiles[y]) {
          let above = this.tiles[y - 1][x];
          let tile = this.tiles[y][x];
          if (!(tile.void && above.void)) {
            tile.setColor(above.color);
            tile.void = above.void;
          }
        }
      }
    } else {
      for (let tile of this.tiles[0]) {
        tile.setVoid();
      }
    }
    this.lineClear();
  }

  loss() {
    let tiles = this.piece.getPieceComponents(this.piece.x, this.piece.y);
    for (let tile of tiles) {
      if (tile != null && !this.getTile(tile.xpos, tile.ypos).void) {
        return true;
      }
    }
    return false;
  }

  checkForLoss() {
    if (this.loss()) {
      for (let col of this.tiles) {
        for (let tile of col) {
          tile.setColor(color(255, 0, 0));
        }
      }
      this.reset();
    }
  }

  reset() {
    for (let col of this.tiles) {
      for (let tile of col) {
        tile.setVoid();
      }
    }
    this.clearedLines = 0;
  }
}
