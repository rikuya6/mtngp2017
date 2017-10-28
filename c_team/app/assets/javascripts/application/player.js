class Player {
  constructor(game, map, asset, sx, sy, direction) {
    this.player = new Sprite(spriteSize.x, spriteSize.y);
    this.player.image = game.assets[asset];
    this.player.startX = sx;
    this.player.startY = sy;
    this.player.startDirection = direction;
    this.player.x = sx;
    this.player.y = sy;
    // @TODO キャラクの上に障害物を置けないようにする。移動したときに判定を変える処理がない map.collisionData[Math.floor(sy / 32) + 1][Math.floor(sx / 32) + 1] = 1;
    this.player.frame = 1;
    this.player.isMoving = false;
    this.player.direction = direction;
    this.d = [180, 270, 90, 0];
    this.player.angle = this.d[direction];
    this.player.walk = 1;
    this.player.up = false;
    this.player.right = false;
    this.player.left = false;
    this.player.down = false;
    this.player.moveController = new MoveController();
    this.player.addAngle = function (add) {
      if(this.angle + add >= 0) this.angle = (this.angle + add) % 360;
      else this.angle = (360 + add) % 360;
    };
    this.player.move = function () {
      switch (this.angle) {
        case 0:
          this.up = true;
          break;
        case 90:
          this.right = true;
          break;
        case 180:
          this.down = true;
          break;
        case 270:
          this.left = true;
          break;
        default:
          throw new Error("想定外の向きです。" + this.angle);
      }
    };
    this.player.moving = function () {
      if (this.moveController.hasNextOrder() && !this.isMoving) {
        switch (this.moveController.nextOrder()) {
          case 0: // まっすぐ
            this.move();
            break;
          case 1: // 右
            this.addAngle(90);
            this.move();
            break;
          case 2:
            this.addAngle(180);
            this.move();
            break;
          case 3: // 左
            this.addAngle(-90);
            this.move();
            break;
          default:
            throw new Error("想定外のorderです。");
        }
      }
      this.frame = this.direction * 3 + this.walk;
      if (this.isMoving) {
        this.moveBy(this.vx, this.vy);
        console.log(this.x, this.y);
        if (game.frame % 3 != 0) {
          this.walk++;
          this.walk %= 3;
        }
        if ((this.vx && (this.x) % spriteSize.x == 0) || (this.vy && this.y % spriteSize.y == 0)) {
          this.isMoving = false;
          this.walk = 1;
        }
      } else {
        this.vx = this.vy = this.tx = this.ty = 0;
        if (this.left || game.input.left) {
          this.direction = 1;
          this.vx = -16;
          this.tx = -16;
        } else if (this.right || game.input.right) {
          this.direction = 2;
          this.vx = 16;
          this.tx = 16;
        } else if (this.up || game.input.up) {
          this.direction = 3;
          this.vy = -16;
          this.ty = -16;
        } else if (this.down || game.input.down) {
          this.direction = 0;
          this.vy = 16;
          this.ty = 16;
        }
        this.right = this.left = this.up = this.down = false;
        if (this.vx || this.vy) {
          let map_x = this.x + (this.vx ? this.vx / Math.abs(this.vx) * spriteSize.x : 0) + spriteSize.x;
          let map_y = this.y + (this.vy ? this.vy / Math.abs(this.vy) * spriteSize.y : 0) + spriteSize.y;
          if (0 <= map_x && map_x < map.width && 0 <= map_y && map_y < map.height && !map.hitTest(map_x, map_y)) {
            this.isMoving = true;
            this.moving(); // 描画を1フレーム中に行う
          }else{
            let width = map._image.width;
            let height = map._image.height;
            let tileWidth = map._tileWidth || width;
            let tileHeight = map._tileHeight || height;
            let array_x = map_x / tileWidth | 0;
            let array_y = map_y / tileHeight | 0;
            // 障害物や壁にぶつかった場合
            let target_map_x = 0, target_map_y = 0, target_array_x = 0, target_array_y = 0;
            this.moveController.decrementMoveCounter(); // 方向をを変えただけは移動数には含まれない。
            switch (this.moveController.getHitTurnDirection()) {
              case 0: // ぶつかったら、左に向く
                this.addAngle(-90);
                break;
              case 1: // ぶつかったら、右を向く
                this.addAngle(90);
                break;
              case 2: // ぶつかったら、左を向く。移動できない場合は右を向く
                if (this.ty == -16) {        // angle 0 の場合
                  target_map_x = map_x - spriteSize.x;
                  target_map_y = map_y + spriteSize.y;
                } else if (this.tx == 16) {  // angle 90 の場合
                  target_map_x = map_x - spriteSize.x;
                  target_map_y = map_y - spriteSize.y;
                } else if (this.ty == 16) { // angle 180 の場合
                  target_map_x = map_x + spriteSize.x;
                  target_map_y = map_y - spriteSize.y;
                } else if (this.tx == -16) { // angle 270 の場合
                  target_map_x = map_x + spriteSize.x;
                  target_map_y = map_y + spriteSize.y;
                }
                target_array_x = (target_map_x / tileWidth) <= 0 ? 0 : target_map_x / tileWidth;
                target_array_y = (target_map_y / tileHeight) <= 0 ? 0 : target_map_y / tileHeight;
                if (0 <= target_array_x && target_array_x < map.width / spriteSize.x && 0 <= target_array_y && target_array_y < map.height) {
                  // console.log("t", target_array_x, target_array_y);
                  // console.log("map_co[t_a_y]", map.collisionData[target_array_y]);
                  // if (this.tx == -16) debugger;
                  if (map.collisionData[target_array_y][target_array_x] == 0) {
                    this.addAngle(-90); // 左に曲がれるなら、左に曲がる
                  } else {
                    this.addAngle(90);  // 左に曲がれないなら、右に曲がる
                  }
                }
                break;
              case 3: // ぶつかったら、右を向く。移動できない場合は左を向く
                if (this.ty == -16) {        // angle 0 の場合
                  target_map_x = map_x + spriteSize.x;
                  target_map_y = map_y + spriteSize.y;
                } else if (this.tx == 16) {  // angle 90 の場合
                  target_map_x = map_x - spriteSize.x;
                  target_map_y = map_y + spriteSize.y;
                } else if (this.ty == 16) { // angle 180 の場合
                  target_map_x = map_x - spriteSize.x;
                  target_map_y = map_y - spriteSize.y;
                } else if (this.tx == -16) { // angle 270 の場合
                  target_map_x = map_x + spriteSize.x;
                  target_map_y = map_y - spriteSize.y;
                }
                target_array_x = (target_map_x / tileWidth) <= 0 ? 0 : target_map_x / tileWidth;
                target_array_y = (target_map_y / tileHeight) <= 0 ? 0 : target_map_y / tileHeight;
                if (0 <= target_array_x && target_array_x < map.width / spriteSize.x && 0 <= target_array_y && target_array_y < map.height) {
                  // console.log("t", target_array_x, target_array_y);
                  // console.log("map_co[t_a_y]", map.collisionData[target_array_y]);
                  // if (this.tx == -16) debugger;
                  if (map.collisionData[target_array_y][target_array_x] == 0) {
                    this.addAngle(90); // 右に曲がれるなら、右に曲がる
                  } else {
                    this.addAngle(-90);  // 右に曲がれないなら、左に曲がる
                  }
                }
                break;
              default:
            }
          }
        }
      }
    };
    this.player.addEventListener('enterframe', function () {
      this.moving();
    });
  }

  getSprite() {
    return this.player;
  }

  reset() { 
    this.player.moveController.reset();
    this.resetPosition();
  }

  resetPosition() {
    this.player.x = this.player.startX;
    this.player.y = this.player.startY;
    this.player.direction = this.player.startDirection;
    this.player.angle = this.d[this.player.startDirection];
    this.player.walk = 1;
    this.player.isMoving = false;
    this.player.frame = 1;
    this.player.up = false;
    this.player.right = false;
    this.player.left = false;
    this.player.down = false;
    this.player.vx = this.player.vy = this.ty = this.tx = 0;
  }
}
