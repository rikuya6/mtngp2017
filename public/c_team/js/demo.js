/*
 * Same sample than examples/expert/rpg
 * but instead of using a group object the
 * map class is mixed with a group so that
 * objects can be nested directly within a
 * map:
 *
    var MapGroup = enchant.Class.mixClasses(Map, Group,true);
    var map = new MapGroup(16, 16);

    map.addChild(player);
    map.addChild(foregroundMap);

    game.rootScene.addChild(map);

    game.rootScene.addEventListener('enterframe', function(e) {
        ...
        map.x = x;
        map.y = y;
    });
 *
 * previously:
 *
    var map = new Map(16, 16);
    ...
    var stage = new Group();
    stage.addChild(map);
    stage.addChild(player);
    stage.addChild(foregroundMap);

    game.rootScene.addChild(stage);

    game.rootScene.addEventListener('enterframe', function(e) {
        ...
        stage.x = x;
        stage.y = y;
    });
 *
 */

enchant();

window.onload = function() {
  var game = new Game(160, 160);
  game.fps = 15;
  game.preload('map1.gif', 'chara0.gif');
  game.onload = function() {
    var MapGroup = enchant.Class.mixClasses(Map, Group, true);
    var map = new MapGroup(16, 16);
    map.image = game.assets['map1.gif'];
    map.loadData([
      [322, 322, 322, 322, 322, 322, 322, 322, 322, 322, 322],
      [322, 322, 322, 322, 322, 322, 322, 322, 322, 322, 322],
      [322, 322, 322, 322, 322, 322, 322, 322, 322, 322, 322],
      [322, 322, 322, 322, 322, 322, 322, 322, 322, 322, 322],
      [322, 322, 322, 322, 322, 322, 322, 322, 322, 322, 322],
      [322, 322, 322, 322, 322, 322, 322, 322, 322, 322, 322]
    ]);
    map.collisionData = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    var foregroundMap = new Map(16, 16);
    foregroundMap.image = game.assets['map1.gif'];
    foregroundMap.loadData([
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    ]);

    var player = new Sprite(32, 32);
    player.x = 0;
    player.y = 0;
    var image = new Surface(96, 128);
    image.draw(game.assets['chara0.gif'], 0, 0, 96, 128, 0, 0, 96, 128);
    player.image = image;

    player.isMoving = false;
    player.direction = 0;
    player.walk = 1;
    player.addEventListener('enterframe', function() {
      this.frame = this.direction * 3 + this.walk;
      if (this.isMoving) {
        this.moveBy(this.vx, this.vy);

        if (!(game.frame % 3)) {
          this.walk++;
          this.walk %= 3;
        }
        if ((this.vx && (this.x - 8) % 16 == 0) || (this.vy && this.y % 16 == 0)) {
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
        if (this.vx || this.vy) {
          var x = this.x + (this.vx ? this.vx / Math.abs(this.vx) * 16 : 0) + 16;
          var y = this.y + (this.vy ? this.vy / Math.abs(this.vy) * 16 : 0) + 16;
          if (0 <= x && x < map.width && 0 <= y && y < map.height && !map.hitTest(x, y)) {
            this.isMoving = true;
            game.input.right = game.input.left = game.input.up = game.input.down = false; // @TODO 暫定
            arguments.callee.call(this);
          }
        }
      }
    });
    map.addChild(player);
    map.addChild(foregroundMap);
    game.rootScene.addChild(map);

    var button = new Button("▶️");
    button.moveTo(90, 120);
    game.rootScene.addChild(button);
    button.ontouchstart = function() {
      // @TODO 正しく動作しない。非同期処理
      this.text = "Running";
      moveOneStepRight();
      moveOneStepRight();
      moveOneStepRight();
    };

    function moveOneStepRight() {
      game.input.right = true;
      // game.input.right = false;
    }

    // var pad = new Pad();
    // pad.x = 0;
    // pad.y = 0;
    // game.rootScene.addChild(pad);

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
