class Piece {
  constructor(x, y, renderObj) {
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.type = 0;
    this.color = 0;
    this.randomPiece();
    this.fallTimeReset = 100;
    this.fallTime = this.fallTimeReset;
    this.controls = new Controls(this);
    this.ghost = new Ghost();
    this.renderObj = renderObj;
  }

  rotate() {
    this.angle += 1;
    this.angle %= 4;
  }

  setType(type) {
    this.type = type;
  }

  setColor(type) {
    switch (type) {
      case 0:
        this.color = color(255, 0, 0);
        break;
      case 1:
        this.color = color(255, 120, 0);
        break;
      case 2:
        this.color = color(255, 255, 0);
        break;
      case 3:
        this.color = color(0, 255, 0);
        break;
      case 4:
        this.color = color(0, 255, 255);
        break;
      case 5:
        this.color = color(0, 0, 255);
        break;
      case 6:
        this.color = color(255, 0, 255);
        break;
      default:
        this.color = color(255, 255, 255);
        break;
    }
    let decolor = 0.7;
    this.color = color(
      this.color._getRed() * decolor,
      this.color._getGreen() * decolor,
      this.color._getBlue() * decolor
    );
  }

  randomPiece() {
    let type = floor(random(0, 7));
    this.setColor(type);
    this.setType(type);
    this.angle = floor(random(0, 4));
  }

  getRotatedComponents(angle) {
    let revert = this.angle;
    this.angle = angle;
    let tiles = this.getPieceComponents(this.x, this.y);
    this.angle = revert;
    return tiles;
  }
  
  getPieceComponents(ox, oy) {
    let tiles = [this.renderObj.getTile(ox, oy), null, null, null];
    switch (this.type) {
      // red
      case 0:
        switch (this.angle) {
          // ##
          //  @#
          case 0:
          case 2:
            tiles[1] = this.renderObj.getTile(ox - 1, oy - 1);
            tiles[2] = this.renderObj.getTile(ox, oy - 1);
            tiles[3] = this.renderObj.getTile(ox + 1, oy);
            break;
          //  #
          // @#
          // #
          case 1:
          case 3:
            tiles[1] = this.renderObj.getTile(ox + 1, oy - 1);
            tiles[2] = this.renderObj.getTile(ox + 1, oy);
            tiles[3] = this.renderObj.getTile(ox, oy + 1);
            break;
        }
        break;
      // orange
      case 1:
        switch (this.angle) {
          //   #
          // #@#
          case 0:
            tiles[1] = this.renderObj.getTile(ox + 1, oy - 1);
            tiles[2] = this.renderObj.getTile(ox - 1, oy);
            tiles[3] = this.renderObj.getTile(ox + 1, oy);
            break;
          // #
          // @
          // ##
          case 1:
            tiles[1] = this.renderObj.getTile(ox, oy - 1);
            tiles[2] = this.renderObj.getTile(ox, oy + 1);
            tiles[3] = this.renderObj.getTile(ox + 1, oy + 1);
            break;
          // #@#
          // #
          case 2:
            tiles[1] = this.renderObj.getTile(ox - 1, oy);
            tiles[2] = this.renderObj.getTile(ox + 1, oy);
            tiles[3] = this.renderObj.getTile(ox - 1, oy + 1);
            break;
          // ##
          //  @
          //  #
          case 3:
            tiles[1] = this.renderObj.getTile(ox - 1, oy - 1);
            tiles[2] = this.renderObj.getTile(ox, oy - 1);
            tiles[3] = this.renderObj.getTile(ox, oy + 1);
            break;
        }
        break;
      // yellow
      case 2:
        // ##
        // @#
        tiles[1] = this.renderObj.getTile(ox, oy - 1);
        tiles[2] = this.renderObj.getTile(ox + 1, oy - 1);
        tiles[3] = this.renderObj.getTile(ox + 1, oy);
        break;
      // lime
      case 3:
        switch (this.angle) {
          //  ##
          // #@
          case 0:
          case 2:
            tiles[1] = this.renderObj.getTile(ox, oy - 1);
            tiles[2] = this.renderObj.getTile(ox + 1, oy - 1);
            tiles[3] = this.renderObj.getTile(ox - 1, oy);
            break;
          // #
          // @#
          //  #
          case 1:
          case 3:
            tiles[1] = this.renderObj.getTile(ox, oy - 1);
            tiles[2] = this.renderObj.getTile(ox + 1, oy);
            tiles[3] = this.renderObj.getTile(ox + 1, oy + 1);
            break;
        }
        break;
      // cyan
      case 4:
        switch (this.angle) {
          // #@##
          case 0:
          case 2:
            tiles[1] = this.renderObj.getTile(ox - 1, oy);
            tiles[2] = this.renderObj.getTile(ox + 1, oy);
            tiles[3] = this.renderObj.getTile(ox + 2, oy);
            break;
          // #
          // #
          // @
          // #
          case 1:
          case 3:
            tiles[1] = this.renderObj.getTile(ox, oy - 2);
            tiles[2] = this.renderObj.getTile(ox, oy - 1);
            tiles[3] = this.renderObj.getTile(ox, oy + 1);
            break;
        }
        break;
      // blue
      case 5:
        switch (this.angle) {
          // #
          // #@#
          case 0:
            tiles[1] = this.renderObj.getTile(ox - 1, oy - 1);
            tiles[2] = this.renderObj.getTile(ox - 1, oy);
            tiles[3] = this.renderObj.getTile(ox + 1, oy);
            break;
          // ##
          // @
          // #
          case 1:
            tiles[1] = this.renderObj.getTile(ox, oy - 1);
            tiles[2] = this.renderObj.getTile(ox + 1, oy - 1);
            tiles[3] = this.renderObj.getTile(ox, oy + 1);
            break;
          // #@#
          //   #
          case 2:
            tiles[1] = this.renderObj.getTile(ox - 1, oy);
            tiles[2] = this.renderObj.getTile(ox + 1, oy);
            tiles[3] = this.renderObj.getTile(ox + 1, oy + 1);
            break;
          //  #
          //  @
          // ##
          case 3:
            tiles[1] = this.renderObj.getTile(ox, oy - 1);
            tiles[2] = this.renderObj.getTile(ox - 1, oy + 1);
            tiles[3] = this.renderObj.getTile(ox, oy + 1);
            break;
        }
        break;
      // purple
      case 6:
        switch (this.angle) {
          //  #
          // #@#
          case 0:
            tiles[1] = this.renderObj.getTile(ox, oy - 1);
            tiles[2] = this.renderObj.getTile(ox - 1, oy);
            tiles[3] = this.renderObj.getTile(ox + 1, oy);
            break;
          // #
          // @#
          // #
          case 1:
            tiles[1] = this.renderObj.getTile(ox, oy - 1);
            tiles[2] = this.renderObj.getTile(ox + 1, oy);
            tiles[3] = this.renderObj.getTile(ox, oy + 1);
            break;
          // #@#
          //  #
          case 2:
            tiles[1] = this.renderObj.getTile(ox - 1, oy);
            tiles[2] = this.renderObj.getTile(ox + 1, oy);
            tiles[3] = this.renderObj.getTile(ox, oy + 1);
            break;
          //  #
          // #@
          //  #
          case 3:
            tiles[1] = this.renderObj.getTile(ox, oy - 1);
            tiles[2] = this.renderObj.getTile(ox - 1, oy);
            tiles[3] = this.renderObj.getTile(ox, oy + 1);
            break;
        }
        break;
    }
    return tiles;
  }

  draw() {
    this.drawGhost();
    this.fall();
    let tiles = this.getPieceComponents(this.x, this.y);
    for (let tile of tiles) {
      if (tile != null) {
        tile.setColor(this.color);
        tile.draw();
      }
    }
  }

  fall() {
    this.fallTime--;
    if (this.fallTime <= 0) {
      this.fallTime = this.fallTimeReset;
      let tiles = this.getPieceComponents(this.x, this.y);
      if (this.canFall()) {
        this.setVoid();
        this.y++;
      } else {
        for (let tile of tiles) {
          if (tile != null) {
            tile.void = false;
            tile.setColor(
              color(
                this.color._getRed() / 2,
                this.color._getGreen() / 2,
                this.color._getBlue() / 2
              )
            );
          }
        }
        this.spawn();
      }
    }
  }

  canFall() {
    for (let tile of this.getPieceComponents(this.x, this.y)) {
      if (tile != null) {
        let tileBelow = this.renderObj.getTile(tile.xpos, tile.ypos + 1);
        if (tileBelow != null) {
          if (!tileBelow.void) {
            return false;
          }
        } else {
          return false;
        }
      }
    }
    return true;
  }

  spawn() {
    this.setPosition(5, -1);
    this.randomPiece();
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  setVoid() {
    for (let tile of this.getPieceComponents(this.x, this.y)) {
      if (tile != null) {
        tile.setVoid();
      }
    }
  }
  
  drawGhost() {
    let y = this.controls.drop();
    this.ghost.setPosition(this.getPieceComponents(this.x, y));
    this.ghost.draw();
  }
}
