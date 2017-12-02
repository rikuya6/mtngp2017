class RuledLine {
  constructor () {
    this.sprite = this.createRuledLineSprite();
  }

  createRuledLineSprite() {
    // 罫線
    let square = new Sprite(gameSize.x, gameSize.y);
    square.x = 0;
    square.y = 0;

    let suef = new Surface(gameSize.x, gameSize.y);
    square.image = suef;
    let cont = suef.context;
    cont.beginPath();
    for (let i = 0; i <= gameSize.x; i += spriteSize.x) {
      cont.moveTo(i, 0);
      cont.lineTo(i, gameSize.x);
      cont.moveTo(0, i);
      cont.lineTo(gameSize.x, i);
    }
    cont.stroke();
    return square;
  }

  getSprite() {
    return this.sprite;
  }
}
