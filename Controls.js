class Controls {
  constructor(piece) {
    this.piece = piece;
  }

  move(key) {
    let reset = false;
    let x = this.piece.x;
    let y = this.piece.y;
    switch (key) {
      case 65:
        if (this.canMove(0)) {
          x--;
        }
        break;
      case 68:
        if (this.canMove(1)) {
          x++;
        }
        break;
      case 87:
        if (this.canRotate((this.piece.angle + 1) % 4)) {
          this.piece.setVoid();
          this.piece.rotate();
        }
        break;
      case 32:
        y = this.drop();
        reset = true;
        break;
      case 83:
        if(this.canMove(2)) {
          this.piece.fallTime = 0;
        }
        break;
    }
    this.piece.setVoid();
    this.piece.setPosition(x, y);
    if (reset) {
      this.piece.fallTime = 0;
    }
  }

  canMove(moveType) {
    for (let tile of this.piece.getPieceComponents(
      this.piece.x,
      this.piece.y
    )) {
      if (tile != null) {
        switch (moveType) {
          // left
          case 0:
            if (!this.isEmpty(tile.xpos - 1, tile.ypos)) {
              return false;
            }
            break;
          // right
          case 1:
            if (!this.isEmpty(tile.xpos + 1, tile.ypos)) {
              return false;
            }
            break;
          // drop
          case 2:
            if (!this.isEmpty(tile.xpos, tile.ypos + 1)) {
              return false;
            }
            break;
        }
      }
    }
    return true;
  }

  canRotate(angle) {
    let rotated = this.piece.getRotatedComponents(angle);
    for (let tile of rotated) {
      if (tile != null) {
        if (!this.isEmpty(tile.xpos, tile.ypos)) {
          return false;
        }
      } else {
        return false;
      }
    }
    return true;
  }

  isEmpty(tilex, tiley) {
    let tile = tetris.board.getTile(tilex, tiley);
    if (tile != null) {
      return tile.void;
    }
    return false;
  }

  drop() {
    let oy = this.piece.y;
    while (this.canMove(2)) {
      this.piece.setVoid();
      this.piece.setPosition(this.piece.x, this.piece.y + 1);
    }
    let ny = this.piece.y;
    this.piece.setPosition(this.piece.x, oy);
    return ny;
  }
}
