enchant();

const gameSize = [x = 320, y = 320];
const spriteSize = [x = 32, y = 32];

window.onload = function() {
  var game = new Game(gameSize.x,gameSize.y);
  game.preload("RZukin.png", "edit_map.png");

  game.onload = function() {
    let rzukin = new Sprite(32, 32);
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
    for(i=-1; i < 320; i += 33){
      cont.moveTo(i, 0);
      cont.lineTo(i, 320);
      cont.moveTo(0, i);
      cont.lineTo(320, i);
    }
    cont.stroke();

    var MapGroup = enchant.Class.mixClasses(Map, Group, true);
    var map = new MapGroup(32, 32);
    map.image = game.assets["edit_map.png"];
    map.loadData([
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0]
    ]);
    map.collisionData = [
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0]
    ];

    var foregroundMap = new Map(32, 32);
    foregroundMap.image = game.assets["edit_map.png"];
    foregroundMap.loadData([
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
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
      move.moveRight();
      move.moveDown();
    };


    var move = new MoveController();
    rzukin.addEventListener('enterframe', function() {
      if (move.isNextOrder()) {
        switch (move.nextOrder()) {
          case 1:
            game.input.right = true;
            break;
          case 2:
            game.input.down = true;
            break;
        }
      }
      this.frame = this.direction * 3 + this.walk;
      if (this.isMoving) {
        this.moveBy(this.vx, this.vy);
        if (!(game.frame % 3)) {
          this.walk++;
          this.walk %= 3;
        }
        if ((this.vx && (this.x) % 32 == 0) || (this.vy && this.y % 32 == 0)) {
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
          var x = this.x + (this.vx ? this.vx / Math.abs(this.vx) * 32 : 0) + 32;
          var y = this.y + (this.vy ? this.vy / Math.abs(this.vy) * 32 : 0) + 32;
          if (0 <= x && x < map.width && 0 <= y && y < map.height && !map.hitTest(x, y)) {
            this.isMoving = true;
            // game.input.right = game.input.left = game.input.up = game.input.down = false; // @TODO 暫定
            arguments.callee.call(this);
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

class MoveController{
  constructor() {
    this.orders = [];
  }

  moveRight() {
    this.orders.push(1);
    console.log("moveRight");
  }

  moveDown() {
    this.orders.push(2);
    console.log("moveDown");
  }

  isNextOrder() {
    return this.orders.length > 0;
  }

  nextOrder() {
    if (!this.isNextOrder()) throw new Error("次のorderが空です。");
    return this.orders.shift();
  }
}
