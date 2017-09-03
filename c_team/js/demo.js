enchant();

const gameSize = {x: 320, y: 320};
const spriteSize = {x: 32, y: 32};

window.onload = function() {
  var game = new Game(gameSize.x,gameSize.y);
  game.preload("RZukin.png", "edit_map.png");

  game.onload = function() {
    let rzukin = new Sprite(spriteSize.x, spriteSize.y);
    rzukin.image = game.assets["RZukin.png"];
    rzukin.x = 0;
    rzukin.y = 0;
    rzukin.frame = 1;
    rzukin.isMoving = false;
    rzukin.direction = 0;
    rzukin.walk = 1;

    let square = new Sprite(320, 320);
    square.x = 0;
    square.y = 0;

    let suef = new Surface(320, 320);
    square.image = suef;
    let cont = suef.context;
    cont.beginPath();
    for(i=-1; i <= 320; i += 33){
      cont.moveTo(i, 0);
      cont.lineTo(i, 320);
      cont.moveTo(0, i);
      cont.lineTo(320, i);
    }
    cont.stroke();

    var MapGroup = enchant.Class.mixClasses(Map, Group, true);
    var map = new MapGroup(spriteSize.x, spriteSize.y);
    map.image = game.assets["edit_map.png"];
    map.loadData([
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0]
    ]);
    map.collisionData = [
      [1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1]
    ];

    var foregroundMap = new Map(spriteSize.x, spriteSize.y);
    foregroundMap.image = game.assets["edit_map.png"];
    foregroundMap.loadData([
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    ]);

    map.addChild(rzukin);
    map.addChild(foregroundMap);
    map.addChild(square);
    game.rootScene.addChild(map);

    var button = new Button("▶️");
    button.moveTo(140, 0);
    game.rootScene.addChild(button);

    button.ontouchstart = function() {
      this.text = "Running";
      for(let i = 0; i < 2; i++) {
        move.moveRight();
        move.moveDown();
        move.moveUp();
        move.moveLeft();
        move.moveLeft();
        move.execute();
      }
    };

    var s = new MapObject(game, map, "RZukin.png");

    var move = new MoveController();
    rzukin.addEventListener('enterframe', function() {
      if (move.hasNextOrder() && !rzukin.isMoving) {
        switch (move.nextOrder()) {
          case 0:
            game.input.up = true;
            break;
          case 1:
            game.input.right = true;
            break;
          case 2:
            game.input.down = true;
            break;
          case 3:
            game.input.left = true;
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
            arguments.callee.call(this);
          }else{
            move.stop();
            alert("この先には進めません!");
          }
        }
      }
    });

    // game.rootScene.addEventListener('enterframe', function(e) {
    //   var x = Math.min((game.width - 16) / 2 - player.x, 0);
    //   var y = Math.min((game.height - 16) / 2 - player.y, 0);
    //   x = Math.max(game.width, x + map.width) - map.width;
    //   y = Math.max(game.height, y + map.height) - map.height;
    //   map.x = x;
    //   map.y = y;
    // });
  };
  game.start();
};

class MoveController {
  constructor() {
    this.label = ["moveUp", "moveRight", "moveDown", "moveLeft"];
    this.orders = [];
    this.finish = false;
  }

  moveUp() {
    this.orders.push(0);
    console.log(this.label[0]);
  }

  moveRight() {
    this.orders.push(1);
    console.log(this.label[1]);
  }

  moveDown() {
    this.orders.push(2);
    console.log(this.label[2]);
  }

  moveLeft() {
    this.orders.push(3);
    console.log(this.label[3]);
  }

  hasNextOrder() {
    return this.orders.length > 0 && this.finish;
  }

  nextOrder() {
    if (!this.hasNextOrder()) throw new Error("次のorderが空です。");
    return this.orders.shift();
  }

  execute() {
    this.finish = true;
  }

  stop() {
    this.finish = false;
    this.deleteAllOrder();
  }

  deleteAllOrder() {
    this.orders = [];
  }

  printAllOrder() {
    for (var e in this.orders) {
      console.log(this.label[this.orders[e]]);
    }
  }

  printNextOrder() {
    if (this.hasNextOrder()) console.log(this.label[this.orders[0]]);
    else console.log("次のorderが空です。");
  }
}

class MapObject {
  constructor(game, map, asset) {
    this.sprite= new Sprite(32, 32);
    this.originX = 0;
    this.originY = 0;
    this.beforeX = 0;
    this.beforeY = 0;
    this.sprite.image = game.assets[asset];
    this.sprite.x = 64;
    map.addChild(this.sprite);
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
}
