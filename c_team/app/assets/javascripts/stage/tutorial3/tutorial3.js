$(document).ready(function () {
  enchant();
  main();
});

function main() {
  gameSize = {
    x: 1152,
    y: 640
  };
  spriteSize = {
    x: 64,
    y: 64
  };

  var game = new Game(gameSize.x, gameSize.y);
  game.preload("azuki_walk.png", "tutorial1/edit_map.png");

  game.onload = function () {
    var MapGroup = enchant.Class.mixClasses(Map, Group, true);
    var map = new MapGroup(spriteSize.x, spriteSize.y);
    map.image = game.assets["tutorial1/edit_map.png"];
    map.loadData([
      [0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0],
      [-1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0],
      [5, 5, 5, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0]
    ]);
    map.collisionData = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3],
      [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3]
    ];

    var foregroundMap = new Map(spriteSize.x, spriteSize.y);
    foregroundMap.image = game.assets["tutorial1/edit_map.png"];
    foregroundMap.loadData([
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    ]);
    var ruledLine = getRuledLineSprite();
    var azuki = new Player(game, map, "azuki_walk.png", 0, 0, 2);
    azuki.player.addEventListener('enterframe', function () {
      let submit = document.getElementById("tutorial3");
      if (this.x == 256 && this.y == 128) {
        if (azuki.player.moveController.getMoveCount() <= 6) {
          Cookies.set('tutorial_status', {
            tutorial1: true,
            tutorial2: true,
            tutorial3: true,
            novel3: true
          });
        } else {
          Cookies.set('tutorial_status', {
            tutorial1: true,
            tutorial2: true,
            tutorial3: true,
            novel3: false
          });
        }
        submit.submit();
        game.pause();
      }
    });
    map.addChild(foregroundMap);
    map.addChild(ruledLine);
    map.addChild(azuki.getSprite());
    game.rootScene.addChild(map);

    var o1 = new MapObject(game, map, "azuki_walk.png", 256, 0, 1);
    var o2 = new MapObject(game, map, "azuki_walk.png", 256, 64, 1);
    var o3 = new MapObject(game, map, "azuki_walk.png", 256, 192, 1);
    var o4 = new MapObject(game, map, "azuki_walk.png", 256, 256, 1);
    var o8 = new MapObject(game, map, "azuki_walk.png", 1024, 128, 3);
    map.addChild(o1.getSprite());
    map.addChild(o2.getSprite());
    map.addChild(o3.getSprite());
    map.addChild(o4.getSprite());
    map.addChild(o8.getSprite());
    var startButton = new StartButton(function () {
      azuki.player.moveController.setHitTurnLeftOrRight();
      azuki.player.moveController.moveStraight();
      azuki.player.moveController.execute();
      resetButton.enable();
      startButton.disable();
    });
    var resetButton = new RsetButton(function () {
      azuki.player.moveController.stop();
      azuki.resetPosition();
      startButton.reset();
      resetButton.reset();
    });
    startButton.move(1024, 0);
    resetButton.move(1024, 64);
    game.rootScene.addChild(startButton.getButtonObject());
    game.rootScene.addChild(resetButton.getButtonObject());
  };
  game.start();
}

function getRuledLineSprite() {
  // 罫線
  let square = new Sprite(gameSize.x, gameSize.y);
  square.x = 0;
  square.y = 0;

  let suef = new Surface(gameSize.x, gameSize.y);
  square.image = suef;
  let cont = suef.context;
  cont.beginPath();
  for (let i = 0; i <= gameSize.x; i += spriteSize.x) {
    cont.moveTo(i, 0);
    cont.lineTo(i, gameSize.x);
    cont.moveTo(0, i);
    cont.lineTo(gameSize.x, i);
  }
  cont.stroke();
  return square;
}
