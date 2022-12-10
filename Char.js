class Char {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.char = "";
    this.segments = [];
    this.size = 2;
    this.generateSegments();
  }

  setSize(size) {
    this.size = size;
    this.generateSegments();
  }
  
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  setChar(char) {
    this.char = char;
  }

  draw(color) {
    this.renderChar();
    for (let seg of this.segments) {
      seg.draw();
    }
    this.seperateSegments(color);
  }

  generateSegments() {
    for (let i = 0; i < 16; i++) {
      this.segments[i] = new Segment(
        this.x,
        this.y,
        this.width,
        this.height,
        i
      );
      this.segments[i].setSize(this.size);
    }
  }

  lightSegments(...segments) {
    for (let seg of this.segments) {
      seg.state = false;
    }
    for (let seg of segments) {
      this.segments[seg].state = true;
    }
  }

  seperateSegments(color) {
    let size = this.size * 1.5;
    noStroke();
    circle(this.x, this.y, size);
    circle(this.x + this.width / 2, this.y, size);
    circle(this.x + this.width, this.y, size);
    circle(this.x, this.y + this.height / 2, size);
    circle(this.x + this.width / 2, this.y + this.height / 2, size);
    circle(this.x + this.width, this.y + this.height / 2, size);
    circle(this.x, this.y + this.height, size);
    circle(this.x + this.width / 2, this.y + this.height, size);
    circle(this.x + this.width, this.y + this.height, size);
    stroke(0);
  }

  renderChar() {
    switch (this.char) {
      case "#":
        this.lightSegments(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15);
        break;
      case "A":
        this.lightSegments(0, 1, 2, 6, 7, 8, 9, 13);
        break;
      case "B":
        this.lightSegments(0, 1, 4, 6, 8, 11, 13, 14, 15);
        break;
      case "C":
        this.lightSegments(0, 1, 2, 9, 14, 15);
        break;
      case "D":
        this.lightSegments(0, 1, 4, 6, 11, 13, 14, 15);
        break;
      case "E":
        this.lightSegments(0, 1, 2, 7, 9, 14, 15);
        break;
      case "F":
        this.lightSegments(0, 1, 2, 7, 9);
        break;
      case "G":
        this.lightSegments(0, 1, 2, 8, 9, 13, 14, 15);
        break;
      case "H":
        this.lightSegments(2, 6, 7, 8, 9, 13);
        break;
      case "I":
        this.lightSegments(0, 1, 4, 11, 14, 15);
        break;
      case "J":
        this.lightSegments(6, 9, 13, 14, 15);
        break;
      case "K":
        this.lightSegments(2, 5, 7, 9, 12);
        break;
      case "L":
        this.lightSegments(2, 9, 14, 15);
        break;
      case "M":
        this.lightSegments(2, 3, 5, 6, 9, 13);
        break;
      case "N":
        this.lightSegments(2, 3, 6, 9, 12, 13);
        break;
      case "O":
        this.lightSegments(0, 1, 2, 6, 9, 13, 14, 15);
        break;
      case "P":
        this.lightSegments(0, 1, 2, 6, 7, 8, 9);
        break;
      case "Q":
        this.lightSegments(0, 1, 2, 6, 9, 12, 13, 14, 15);
        break;
      case "R":
        this.lightSegments(0, 1, 2, 6, 7, 8, 9, 12);
        break;
      case "S":
        this.lightSegments(0, 1, 2, 7, 8, 13, 14, 15);
        break;
      case "T":
        this.lightSegments(0, 1, 4, 11);
        break;
      case "U":
        this.lightSegments(2, 6, 9, 13, 14, 15);
        break;
      case "V":
        this.lightSegments(2, 5, 9, 10);
        break;
      case "W":
        this.lightSegments(2, 6, 9, 10, 12, 13);
        break;
      case "X":
        this.lightSegments(3, 5, 10, 12);
        break;
      case "Y":
        this.lightSegments(3, 5, 11);
        break;
      case "Z":
        this.lightSegments(0, 1, 5, 10, 14, 15);
        break;
      case "0":
        this.lightSegments(0, 1, 2, 5, 6, 9, 10, 13, 14, 15);
        break;
      case "1":
        this.lightSegments(5, 6, 13);
        break;
      case "2":
        this.lightSegments(0, 1, 6, 7, 8, 9, 14, 15);
        break;
      case "3":
        this.lightSegments(0, 1, 6, 7, 8, 13, 14, 15);
        break;
      case "4":
        this.lightSegments(2, 6, 7, 8, 13);
        break;
      case "5":
        this.lightSegments(0, 1, 2, 7, 8, 13, 14, 15);
        break;
      case "6":
        this.lightSegments(0, 1, 2, 7, 8, 9, 13, 14, 15);
        break;
      case "7":
        this.lightSegments(0, 1, 6, 13);
        break;
      case "8":
        this.lightSegments(0, 1, 2, 6, 7, 8, 9, 13, 14, 15);
        break;
      case "9":
        this.lightSegments(0, 1, 2, 6, 7, 8, 13, 14, 15);
        break;
      default:
        this.lightSegments(7, 8);
        break;
    }
  }
}
