class MapObject {
  constructor(game, map, asset, sx, sy, hitStatus) {
    this.sprite= new Sprite(spriteSize.x, spriteSize.y);
    this.originX = 0;
    this.originY = 0;
    this.beforeX = 0;
    this.beforeY = 0;
    this.sprite.image = game.assets[asset];
    this.sprite.changeCollisionData = function(x, y, state) {
      var width = map._image.width;
      var height = map._image.height;
      var tileWidth = map._tileWidth || width;
      var tileHeight = map._tileHeight || height;
      x = x / tileWidth | 0;
      y = y / tileHeight | 0;
      if (map.collisionData[y + 1][x + 1] == 3) state = 3; // マップの外のため変更対象外
      map.collisionData[y + 1][x + 1] = state;
    };
    this.sprite.x = sx;
    this.sprite.y = sy;
    this.sprite.changeCollisionData(sx, sy, hitStatus);

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
      for (let i = 0; i <= map.width; i+=spriteSize.x) {
        if (e.x <= i) {
          nx = i - spriteSize.x;
          break;
        }
      }
      for (let i = 0; i <= map.height; i+=spriteSize.y) {
        if (e.y <= i) {
          ny = i - spriteSize.y;
          break;
        }
      }
      if (nx < 0 || nx > map.width || ny < 0 || ny > map.height) {
        alert("範囲外の指定です。"); // @TODO　仕様未決定
        this.x = this.beforeX;
        this.y = this.beforeY;
        return;
      }
      var collision_num =  map.collisionData[Math.floor(ny / spriteSize.y) + 1][Math.floor(nx / spriteSize.x) + 1];
      if (collision_num == 1 || collision_num == 2) {
        // 障害物の上に別の障害物は置けない
        this.x = this.beforeX;
        this.y = this.beforeY;
        return;
      }
      console.log(nx, ny);
      this.x = nx;
      this.y = ny;
      this.changeCollisionData(this.beforeX, this.beforeY, 0); // 一つ前のマスを当たり判定なしにする
      this.changeCollisionData(this.x, this.y, 1); // 現在のマスを当たり判定ありにする
    });
  }

  getSprite() {
    return this.sprite;
  }
}
