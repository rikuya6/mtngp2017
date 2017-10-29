$(document).ready(function () {
  enchant();
  main();
});

var gameSize = {
  x: 1152,
  y: 640
};
var spriteSize = {
  x: 64,
  y: 64
};

function main() {
  var game = new Game(gameSize.x, gameSize.y);
  game.preload("stage2/bus.png", "road.png", "objects.png", "color_cone.png");

  game.onload = function () {
    var MapGroup = enchant.Class.mixClasses(Map, Group, true);
    var map = new MapGroup(spriteSize.x, spriteSize.y);
    map.image = game.assets["road.png"];
    map.loadData([
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0]
    ]);
    map.collisionData = [
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3],
      [2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 3, 3],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 3, 3],
      [2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3],
      [2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 3, 3],
      [2, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3],
      [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 3, 3],
      [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 3, 3],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3]
    ];

    var foregroundMap = new Map(spriteSize.x, spriteSize.y);
    foregroundMap.image = game.assets["objects.png"];
    foregroundMap.loadData([
      [5,   5,  5,  5,  5, 14, -1, -1, -1, -1, -1, -1, -1, -1,  5,  5, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14,  5,  5, -1, -1],
      [-1, -1, -1,  5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, 14, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  5, -1, -1, -1, -1, -1, -1],
      [-1, 14, -1, -1,  5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [ 5, -1, -1, -1, -1, -1, -1, -1, -1, 14, -1, -1, -1, 14, -1, -1, -1, -1],
      [ 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  5, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    ]);
    var ruledLine = getRuledLineSprite();
    var bus = new Player(game, map, "stage2/bus.png", 832, 576, 3);
    let submit = document.getElementById("stage2");
    let bus_stop1 = false;
    bus.player.addEventListener('enterframe', function () {
      // バス停1
      if (this.x == 832 && this.y == 256) flower_shop = true;
      if ((this.x == 576 && this.y == 576) || (this.x == -10 && this.y == 576)) library = true;
      if (this.x == 960 && this.y == 576) {
        Cookies.set('status', {
          tutorial1: true,
          flower_flg: flower_shop,
          park_flg: park,
          library_flg: library
        }); // データはJSON形式で保存する
        submit.submit();
        game.pause();
      }
    });
    var o1 = new MapObject(game, map, bus.player.moveController, "color_cone.png", 1024, 128, 3);
    var o2 = new MapObject(game, map, bus.player.moveController, "color_cone.png", 1088, 128, 3);
    var o3 = new MapObject(game, map, bus.player.moveController, "color_cone.png", 1024, 192, 3);
    var o4 = new MapObject(game, map, bus.player.moveController, "color_cone.png", 1088, 192, 3);
    var o5 = new MapObject(game, map, bus.player.moveController, "color_cone.png", 1024, 256, 3);
    var o6 = new MapObject(game, map, bus.player.moveController, "color_cone.png", 1088, 256, 3);
    var o7 = new MapObject(game, map, bus.player.moveController, "color_cone.png", 1024, 320, 3);
    map.addChild(foregroundMap);
    // map.addChild(ruledLine);
    map.addChild(bus.getSprite());
    map.addChild(o1.getSprite());
    map.addChild(o2.getSprite());
    map.addChild(o3.getSprite());
    map.addChild(o4.getSprite());
    map.addChild(o5.getSprite());
    map.addChild(o6.getSprite());
    map.addChild(o7.getSprite());
    game.rootScene.addChild(map);

    var startButton = new StartButton(function () {
      bus.player.moveController.setHitTurnLeftOrRight();
      bus.player.moveController.moveStraight();
      bus.player.moveController.execute();
      resetButton.enable();
      startButton.disable();
    });
    var resetButton = new RsetButton(function () {
      startButton.reset();
      resetButton.reset(bus);
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
