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
    this.player.moveSpeed = 4; // default: 4
    this.player.up = false;
    this.player.right = false;
    this.player.left = false;
    this.player.down = false;
    this.player.isDebugMode = false; // default: false
    this.player.moveController = new MoveController();
    this.player.addAngle = function (add) {
      if(this.angle + add >= 0) this.angle = (this.angle + add) % 360;
      else this.angle = (360 + add) % 360;
    };
    this.player.changeAngleDown = function () {
      switch (this.angle) {
        case 0:
        case 180:
          this.addAngle(180);
          break;
        case 90:
          this.addAngle(90);
          break;
        case 270:
          this.addAngle(-90);
          break;
      }
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
        if (this.isDebugMode) console.log(this.x, this.y); // 現在のplayer座標
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
        if (this.left || (this.isDebugMode && game.input.left)) {
          this.direction = 1;
          this.vx = -this.moveSpeed;
          this.tx = -this.moveSpeed;
        } else if (this.right || (this.isDebugMode && game.input.right)) {
          this.direction = 2;
          this.vx = this.moveSpeed;
          this.tx = this.moveSpeed;
        } else if (this.up || (this.isDebugMode && game.input.up)) {
          this.direction = 3;
          this.vy = -this.moveSpeed;
          this.ty = -this.moveSpeed;
        } else if (this.down || (this.isDebugMode && game.input.down)) {
          this.direction = 0;
          this.vy = this.moveSpeed;
          this.ty = this.moveSpeed;
        }
        this.right = this.left = this.up = this.down = false;
        if (this.vx || this.vy) {
          // front_map_x, front_map_y は予定移動先(正面)の座標を得る
          let front_map_x = this.x + (this.vx ? this.vx / Math.abs(this.vx) * spriteSize.x : 0) + spriteSize.x;
          let front_map_y = this.y + (this.vy ? this.vy / Math.abs(this.vy) * spriteSize.y : 0) + spriteSize.y;
          if (0 <= front_map_x && front_map_x < map.width && 0 <= front_map_y && front_map_y < map.height && !map.hitTest(front_map_x, front_map_y)) {
            this.isMoving = true;
            this.moving(); // 描画を1フレーム中に行う
          }else{
            // 障害物や壁にぶつかった場合
            let width = map._image.width;
            let height = map._image.height;
            let tileWidth = map._tileWidth || width;
            let tileHeight = map._tileHeight || height;
            let left_map_x = 0, left_map_y = 0, left_array_x = 0, left_array_y = 0;
            let right_map_x = 0, right_map_y = 0, right_array_x = 0, right_array_y = 0;
            let front_array_x = (front_map_x / tileWidth) <= 0 ? 0 : front_map_x / tileWidth;
            let front_array_y = (front_map_y / tileHeight) <= 0 ? 0 : front_map_y / tileHeight;
            let front_collision_flag = map.collisionData[front_array_y][front_array_x];
            this.moveController.decrementMoveCounter(); // 方向をを変えただけは移動数には含まれない。
            switch (this.moveController.getHitTurnDirection()) {
              case 0: // ぶつかったら、左に向く
                this.addAngle(-90);
                break;
              case 1: // ぶつかったら、右を向く
                this.addAngle(90);
                break;
              case 2: // ぶつかったら、左を向く。移動できない場合は右を向く
                // キャラクタから見て左側のマス上の座標を得る(left_map_x, left_map_y)
                if (this.ty == -this.moveSpeed) {        // angle 0 の場合
                  left_map_x = front_map_x - spriteSize.x;
                  left_map_y = front_map_y + spriteSize.y;
                } else if (this.tx == this.moveSpeed) {  // angle 90 の場合
                  left_map_x = front_map_x - spriteSize.x;
                  left_map_y = front_map_y - spriteSize.y;
                } else if (this.ty == this.moveSpeed) { // angle 180 の場合
                  left_map_x = front_map_x + spriteSize.x;
                  left_map_y = front_map_y - spriteSize.y;
                } else if (this.tx == -this.moveSpeed) { // angle 270 の場合
                  left_map_x = front_map_x + spriteSize.x;
                  left_map_y = front_map_y + spriteSize.y;
                }
                // left_array_X, left_array_yはキャラクタからみて、左のマスのindexを指し示す
                left_array_x = (left_map_x / tileWidth) <= 0 ? 0 : left_map_x / tileWidth;
                left_array_y = (left_map_y / tileHeight) <= 0 ? 0 : left_map_y / tileHeight;
                let left_collision_flag = map.collisionData[left_array_y][left_array_x];
                if (0 <= left_array_x && left_array_x < map.width / spriteSize.x && 0 <= left_array_y && left_array_y < map.height) {
                  if (front_collision_flag == 4) {
                    // 4 は下を向く
                    this.changeAngleDown();
                  } else if (left_collision_flag == 0) {
                    this.addAngle(-90); // 左に曲がれるなら、左に曲がる
                  } else {
                    this.addAngle(90);  // 左に曲がれないなら、右に曲がる
                  }
                }
                break; // case2のbreak;
              case 3: // ぶつかったら、右を向く。移動できない場合は左を向く
                // キャラクタから見て右側のマス上の座標を得る(right_map_x, right_map_y)
                if (this.ty == -this.moveSpeed) {        // angle 0 の場合
                  right_map_x = front_map_x + spriteSize.x;
                  right_map_y = front_map_y + spriteSize.y;
                } else if (this.tx == this.moveSpeed) {  // angle 90 の場合
                  right_map_x = front_map_x - spriteSize.x;
                  right_map_y = front_map_y + spriteSize.y;
                } else if (this.ty == this.moveSpeed) { // angle 180 の場合
                  right_map_x = front_map_x - spriteSize.x;
                  right_map_y = front_map_y - spriteSize.y;
                } else if (this.tx == -this.moveSpeed) { // angle 270 の場合
                  right_map_x = front_map_x + spriteSize.x;
                  right_map_y = front_map_y - spriteSize.y;
                }
                right_array_x = (right_map_x / tileWidth) <= 0 ? 0 : right_map_x / tileWidth;
                right_array_y = (right_map_y / tileHeight) <= 0 ? 0 : right_map_y / tileHeight;
                let right_collision_flag = map.collisionData[right_array_y][right_array_x];
                if (0 <= right_array_x && right_array_x < map.width / spriteSize.x && 0 <= right_array_y && right_array_y < map.height) {
                  if (front_collision_flag == 4) {
                    // 4 は下を向く
                    this.changeAngleDown();
                  } else if (right_collision_flag == 0) {
                    this.addAngle(90); // 右に曲がれるなら、右に曲がる
                  } else {
                    this.addAngle(-90);  // 右に曲がれないなら、左に曲がる
                  }
                }
                break; // case3のbreak;
            }
          }
        }
      }
    };
    this.player.addEventListener('enterframe', function () {
      this.moving();
    });
    this.debugMode(game, this.player); // デバック用関数
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

  debugMode(game, player) {
    game._debugS = false;
    game._default_moevSpeed = player.moveSpeed;
    game.keybind('S'.charCodeAt(0), 'S');
    game.addEventListener('Sbuttondown', function() {
      game._debugS = !game._debugS;
    });
    game.addEventListener('enterframe', function() {
      if (game._debugS) {
        player.isDebugMode = true;
        player.moveSpeed = 16;
      } else {
        player.isDebugMode = false;
        player.moveSpeed = game._default_moevSpeed;
      }
    });
  }
}
