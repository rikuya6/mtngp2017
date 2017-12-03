class MapObstacle extends MapObject {
  constructor(game, map, moveController, asset, hitStatus) {
    super(game, map, asset, hitStatus);
    this.sprite.self = this;
    this.originX = 0;
    this.originY = 0;
    this.beforeX = 0;
    this.beforeY = 0;
    this.mapX = [1024, 1088, 1024, 1088, 1024, 1088, 1024, 1088, 1024, 1088, 1024, 1088, 1024, 1088, 1024, 1088];
    this.mapY = [128,  128,  192,  192,  256,  256,  320,  320,  384,  384,  448,  448,  512,  512,  576, 576];
    this.initCoordinate(map);
    this.changeCollisionData(this.sprite.x, this.sprite.y, this.sprite.defaultHitStatus);
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
        this.self._moveCancel();
        return;
      }
      var collision_num =  map.collisionData[Math.floor(ny / spriteSize.y) + 1][Math.floor(nx / spriteSize.x) + 1];
      if (collision_num == 1 || collision_num == 2 || collision_num == 4) {
        // 障害物の上に別の障害物は置けない
        this.self._moveCancel();
        return;
      } else if (collision_num == 3) { // UI上の障害物
        let targetIndex = this.self.getMapObjectTrayIndex(nx, ny);
        if (this.self.hasMapObjectTray(targetIndex)) {
          // すでに障害物が置かれている
          this.self._moveCancel();
          return;
        } else {
          this.self.setMapObjectTray(targetIndex);
        }
      }
      console.log(nx, ny);
      this.x = nx;
      this.y = ny;
      let mapArrayX = this.self.getMapArrayX(this.beforeX);
      let mapArrayY = this.self.getMapArrayY(this.beforeY);
      let collisionStatus = this.self.getCollisionData(mapArrayX + 1, mapArrayY + 1);
      if (collisionStatus == 3) {
        // 移動前のMapObjectTrayのtargetIndex目をfalseにする
        let targetIndex = this.self.getMapObjectTrayIndex(this.beforeX, this.beforeY);
        this.self.resetMapObjectTray(targetIndex);
      }
      this.self.changeCollisionData(this.beforeX, this.beforeY, 0); // 移動前のマスを当たり判定なしにする
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
      this.self.changeCollisionData(this.x, this.y, changeStatus);
    });
  }

  initCoordinate(map) {
    // UI上のmap_objectの座標を決定
    if (typeof map.mapObjectTray === 'undefined') map.mapObjectTray = 0;
    let max_obstacle = 16;
    let max_mask = (1 << (max_obstacle - 1)); // 32768 (16のフラグ)
    if (map.mapObjectTray & max_mask) throw new Error('これ以上障害物をマップ上に追加できません');
    for (let i = 0; i < max_obstacle; i++) {
      if (!this.hasMapObjectTray(i)) {
        this.setMapObjectTray(i);
        this.sprite.x = this.mapX[i];
        this.sprite.y = this.mapY[i];
        break;
      }
    }
  }

  appendMap(map) {
    map.addChild(this.getSprite());
  }

  getMapObjectTrayIndex(mapX, mapY) {
    let xIndex = this.mapX.findIndex(this._searchCoordinateIndex, mapX);
    let yIndex = this.mapY.findIndex(this._searchCoordinateIndex, mapY);
    return xIndex + yIndex;
  }

  _searchCoordinateIndex(element, index, array) {
    if (array[index] == this)
      return true;
    else
      return false;
  }

  _moveCancel() {
    this.sprite.x = this.sprite.beforeX;
    this.sprite.y = this.sprite.beforeY;
  }
}
