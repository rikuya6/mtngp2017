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
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 2],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3],
      [2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 3, 3],
      [2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3],
      [2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 3, 3],
      [2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 3, 3],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 3, 3],
      [2, 0, 0, 0, 2, 0, 0, 2, 2, 2, 2, 0, 0, 0, 2, 2, 0, 3, 3],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 3, 3],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3]
    ];

    var foregroundMap = new Map(spriteSize.x, spriteSize.y);
    foregroundMap.image = game.assets["objects.png"];
    foregroundMap.loadData([
      [-1, -1, -1, -1, 23,  5,  5,  5,  5, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, 27, -1, -1, -1, -1, -1,  5, -1, 22, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 27, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1,  5,  5, 19,  5,  5,  5, -1, -1, -1, -1, -1,  5, -1, -1],
      [ 5,  5, 21, -1, -1, -1, 27, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [ 5,  5, 27, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  5,  5, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1,  5,  5,  5, 20, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 27,  5, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1,  5, -1, -1,  5,  5,  5,  5, -1, -1, -1, 18,  5, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  5, -1, 27, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    ]);
    // var ruledLine = (new RuledLine()).getSprite();
    let bus = new Player(game, map, "stage2/bus.png", 832, 576, 1);
    let submit = document.getElementById("stage3_novel");
    let bus_stop = [false, false, false, false];
    bus.player.addEventListener('enterframe', function () {
      // バス停1
      if (this.x == 384 && this.y == 256) {
        for (let i = 1; i < bus_stop.length; i++)
          if (bus_stop[i]) bus_stop[0] = false; // 先に他のバス停を通過している
          else bus_stop[0] = true;
      }
      // バス停2
      if (this.x == 640 && this.y == 448) {
        if (bus_stop[0]) bus_stop[1] = true; // バス停1を通過していたらtrue
      }
      // バス停3
      if (this.x == 128 && this.y == 320) {
        if (bus_stop[1]) bus_stop[2] = true; // バス停2を通過していたらtrue
      }
      // バス停4
      if (this.x == 768 && this.y == 128) {
        if (bus_stop[2]) bus_stop[3] = true; // バス停3を通過していたらtrue
      }
      // ゴール(バス停5)
      if (this.x == 256 && this.y == 64) {
        Cookies.set('status', {
          stage1: true,
          stage2: true,
          bus_stop_flg: bus_stop
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
    var o8 = new MapObject(game, map, bus.player.moveController, "color_cone.png", 1088, 320, 3);
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
    map.addChild(o8.getSprite());
    game.rootScene.addChild(map);

    var startButton = new StartButton(function () {
      bus.player.moveController.setHitTurnLeftOrRight();
      bus.player.moveController.moveStraight();
      bus.player.moveController.execute();
      resetButton.enable();
      startButton.disable();
    });
    var resetButton = new RsetButton(function () {
      bus_stop = [false, false, false, false];
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
