class Player {
  constructor(game, map, asset, sx, sy, direction) {
    this.player = new Sprite(spriteSize.x, spriteSize.y);
    this.player.image = game.assets[asset];
    this.player.x = sx;
    this.player.y = sy;
    // @TODO キャラクの上に障害物を置けないようにする。移動したときに判定を変える処理がない map.collisionData[Math.floor(sy / 32) + 1][Math.floor(sx / 32) + 1] = 1;
    this.player.frame = 1;
    this.player.isMoving = false;
    this.player.direction = direction;
    this.player.walk = 1;
    this.player.angle = (45 * direction) % 360;
    this.player.moveController = new MoveController();
    this.player.addAngle = function (add) {
      if(this.angle + add >= 0) this.angle = (this.angle + add) % 360;
      else this.angle = 360 + add;
    };
    this.player.move = function () {
      if (this.moveController.hasNextOrder() && !this.isMoving) {
        switch (this.moveController.nextOrder()) {
          case 0: // まっすぐ
            break;
          case 1: // 右
            this.addAngle(90);
            break;
          case 2:
            this.addAngle(180);
            break;
          case 3: // 左
            this.addAngle(-90);
            break;
          default:
            throw new Error("想定外のorderです。");
        }
        // console.log("angle", this.angle);
        switch (this.angle) {
          case 0:
            game.input.up = true;
            break;
          case 90:
            game.input.right = true;
            break;
          case 180:
            game.input.down = true;
            break;
          case 270:
            game.input.left = true;
            break;
          default:
            throw new Error("想定外の向きです。" + this.angle);
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
        this.vx = this.vy = 0;
        if (game.input.left) {
          this.direction = 1;
          this.vx = -4;
        } else if (game.input.right) {
          this.direction = 2;
          this.vx = 4;
        } else if (game.input.up) {
          this.direction = 3;
          this.vy = -4;
        } else if (game.input.down) {
          this.direction = 0;
          this.vy = 4;
        }
        game.input.right = game.input.left = game.input.up = game.input.down = false;
        if (this.vx || this.vy) {
          var x = this.x + (this.vx ? this.vx / Math.abs(this.vx) * spriteSize.x : 0) + spriteSize.x;
          var y = this.y + (this.vy ? this.vy / Math.abs(this.vy) * spriteSize.y : 0) + spriteSize.y;
          if (0 <= x && x < map.width && 0 <= y && y < map.height && !map.hitTest(x, y)) {
            this.isMoving = true;
            this.move(); // 描画を1フレーム中に行う
          }else{
            console.log(x, y, map.width, map.height);
            this.moveController.stop();
            alert("この先には進めません!");
          }
        }
      }
    };
    this.player.addEventListener('enterframe', function () {
      this.move();
    });
  }

  getSprite() {
    return this.player;
  }
}
