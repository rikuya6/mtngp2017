class MapObstacle {
  constructor(game, map, moveController, asset, hitStatus) {
    this.sprite= new Sprite(spriteSize.x, spriteSize.y);
    this.originX = 0;
    this.originY = 0;
    this.beforeX = 0;
    this.beforeY = 0;
    this.sprite.image = game.assets[asset];
    this.sprite.defaultHitStatus = hitStatus;
    this.initCoordinate(map);
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
    this.sprite.changeCollisionData(this.sprite.x, this.sprite.y, this.sprite.defaultHitStatus);
    this.sprite.addEventListener(enchant.Event.TOUCH_START, function(e) {
      if (moveController.hasNextOrder()) return; // 移動を開始していたら、マップオブジェクトは動かせない
      this.originX = e.x - this.x;
      this.originY = e.y - this.y;
      this.beforeX = this.x;
      this.beforeY = this.y;
    });
    this.sprite.addEventListener(enchant.Event.TOUCH_MOVE, function(e){
      if (moveController.hasNextOrder()) return; // 移動を開始していたら、マップオブジェクトは動かせない
      this.x = e.x - this.originX;
      this.y = e.y - this.originY;
    });
    this.sprite.addEventListener(enchant.Event.TOUCH_END, function(e){
      if (moveController.hasNextOrder()) return; // 移動を開始していたら、マップオブジェクトは動かせない
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
      if (collision_num == 1 || collision_num == 2 || collision_num == 4) {
        // 障害物の上に別の障害物は置けない
        this.x = this.beforeX;
        this.y = this.beforeY;
        return;
      }
      console.log(nx, ny);
      this.x = nx;
      this.y = ny;
      this.changeCollisionData(this.beforeX, this.beforeY, 0); // 一つ前のマスを当たり判定なしにする
      // 現在のマスを当たり判定ありにする
      // 通常1。defaultHitStatusが4の場合は特殊。
      let changeStatus;
      switch (this.defaultHitStatus) {
        case 4:
          changeStatus = 4;
          break;
        default:
          changeStatus = 1;
          break;
      }
      this.changeCollisionData(this.x, this.y, changeStatus);
    });
  }

  getSprite() {
    return this.sprite;
  }

  initCoordinate(map) {
    // UI上のmap_objectの座標を決定
    if (typeof map.mapObjectTray === 'undefined') map.mapObjectTray = 0;
    let x = [1024, 1088, 1024, 1088, 1024, 1088, 1024, 1088, 1024, 1088, 1024, 1088, 1024, 1088, 1024, 1088];
    let y = [128,  128,  192,  192,  256,  256,  320,  320,  384,  384,  448,  448,  512,  512,  576, 576];
    let max_mask = 32768; // 16のフラグ
    if (map.mapObjectTray & max_mask) throw new Error('これ以上障害物をマップ上に追加できません');
    for (let i = 1, p = 0; i <= max_mask; i = i * 2, p++) {
      if (!(map.mapObjectTray & i)) {
        map.mapObjectTray |= i;
        this.sprite.x = x[p];
        this.sprite.y = y[p];
        break;
      }
    }
  }

  appendMap(map) {
    map.addChild(this.getSprite());
  }
}
