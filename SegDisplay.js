class SegDisplay extends Display {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.color = color(20, 20, 20);
    this.chars = [];
    this.charCount = 4;
    this.generateCharArray();
  }

  setChars(count) {
    this.charCount = count;
    this.generateCharArray();
  }

  generateCharArray() {
    let charSize = this.getCharWidth();
    for (let i = 0; i < this.charCount; i++) {
      this.chars[i] = new Char(
        this.x + this.margin + i*(this.margin + charSize),
        this.y + this.margin,
        this.getCharWidth(),
        this.getCharHeight()
      );
      this.chars[i].setSize(this.getCharWidth()/ 7);
    }
  }

  getCharWidth() {
    let totalMargin = this.margin + this.charCount * this.margin;
    let characterSpace = this.width - totalMargin;
    return characterSpace / this.charCount;
  }
  
  getCharHeight() {
    return this.height - (2 * this.margin);
  }

  draw() {
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
    for (let char of this.chars) {
      char.draw(this.color);
    }
  }

  setText(text) {
    let startPosition = this.charCount - text.length;
    if(startPosition < 0) {
      startPosition = 0;
    }
    for (let i = startPosition; i < this.charCount; i++) {
      this.chars[i].setChar(text.charAt(i - startPosition));
    }
  }
}
