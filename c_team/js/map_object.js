class MapObject {
  constructor(game, map, asset) {
    this.sprite= new Sprite(32, 32);
    this.originX = 0;
    this.originY = 0;
    this.beforeX = 0;
    this.beforeY = 0;
    this.sprite.image = game.assets[asset];
    this.sprite.x = 64;

    this.sprite.addEventListener(enchant.Event.TOUCH_START, function(e){
      this.originX = e.x - this.x;
      this.originY = e.y - this.y;
      this.beforeX = this.x;
      this.beforeY = this.y;
    });
    this.sprite.addEventListener(enchant.Event.TOUCH_MOVE, function(e){
      this.x = e.x - this.originX;
      this.y = e.y - this.originY;
    });
    this.sprite.addEventListener(enchant.Event.TOUCH_END, function(e){
      let nx = 0, ny = 0;
      for (let i = 0; i <= map.width; i+=32) {
        if (e.x <= i) {
          nx = i - 32;
          break;
        }
      }
      for (let i = 0; i <= map.width; i+=32) {
        if (e.y <= i) {
          ny = i - 32;
          break;
        }
      }
      if (nx < 0 || nx > 256 || ny < 0 || ny > 256) {
        alert("範囲外の指定です。"); // @TODO　仕様未決定
        this.x = this.beforeX;
        this.y = this.beforeY;
        return;
      }
      console.log(nx, ny);
      this.x = nx;
      this.y = ny;
      map.collisionData[Math.floor(this.beforeY / 32) + 1][Math.floor(this.beforeX / 32) + 1] = 0; // 一つ前のマスを当たり判定なしにする
      map.collisionData[Math.floor(this.y / 32) + 1][Math.floor(this.x / 32) + 1] = 1;  // 現在のマスを当たり判定ありにする
    });
  }

  getSprite() {
    return this.sprite;
  }
}
