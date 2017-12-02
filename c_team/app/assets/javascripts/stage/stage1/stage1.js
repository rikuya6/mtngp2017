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
  game.preload("azuki_walk.png", "road.png", "objects.png", "color_cone.png");

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
      [2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2],
      [2, 0, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 0, 3, 3],
      [2, 0, 2, 2, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 3, 3],
      [2, 0, 2, 2, 2, 0, 0, 2, 2, 0, 2, 0, 0, 0, 0, 0, 0, 3, 3],
      [2, 0, 2, 2, 2, 0, 0, 2, 2, 0, 2, 0, 0, 0, 0, 0, 0, 3, 3],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3],
      [2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 3, 3],
      [2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 3, 3],
      [2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3]
    ];

    var foregroundMap = new Map(spriteSize.x, spriteSize.y);
    foregroundMap.image = game.assets["objects.png"];
    foregroundMap.loadData([
      [2,   5,  5,  5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 17, 17],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  5,  5, -1, 17, 17],
      [-1,  5,  5,  5, -1,  5,  5,  5,  5,  5,  5,  5, -1,  5,  5, -1, 17, 17],
      [-1,  5,  5,  5, -1, -1, -1, -1, -1,  5, -1, -1, -1,  6, -1, -1, 17, 17],
      [-1,  5,  5,  5, -1, -1,  0,  1, -1,  5, -1, -1, -1, -1, -1, -1, 17, 17],
      [-1,  5,  5,  5, -1, -1,  3,  4, -1,  5, -1, -1, -1, -1, -1, -1, 17, 17],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 17, 17],
      [ 5,  5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  5,  5, 17, 17],
      [ 5,  5,  5,  5, -1, 14, 14, 14, 14, 15, 16, -1, -1, -1,  5, 18, 17, 17],
      [ 5,  5,  5,  5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 25, 17, 17],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 17, 17]
    ]);
    let ruledLine = (new RuledLine()).getSprite();
    let azuki = new Player(game, map, "azuki_walk.png", 0, 64, 0);
    let submit = document.getElementById("stage1_novel");
    let flower_shop = false;
    let park = false;
    let library = false;
    azuki.player.addEventListener('enterframe', function () {
      // 花屋
      if (this.x == 832 && this.y == 256) flower_shop = true;
      // 公園
      if ((this.x == 384 && this.y == 384) || (this.x == 448 && this.y == 384)) {
        park = true;
      }
      // 図書館
      if ((this.x == 576 && this.y == 576) || (this.x == 640 && this.y == 576)) library = true;
      if (this.x == 960 && this.y == 576) {
        if (park || library) flower_shop = false; // 公園または、図書館を通っていた場合、花屋のフラグは無効とする。
        Cookies.set('status', {
          stage1: true,
          flower_flg: flower_shop,
          park_flg: park,
          library_flg: library
        });
        submit.submit();
        game.pause();
      }
    });
    map.addChild(foregroundMap);
    map.addChild(ruledLine);
    map.addChild(azuki.getSprite());
    game.rootScene.addChild(map);

    for(let i = 0; i < 5; i++)
      (new MapObject(game, map, azuki.player.moveController, "color_cone.png", 3)).appendMap(map);

    var startButton = new StartButton(function () {
      azuki.player.moveController.setHitTurnLeftOrRight();
      azuki.player.moveController.moveStraight();
      azuki.player.moveController.execute();
      resetButton.enable();
      startButton.disable();
    });
    var resetButton = new RsetButton(function () {
      flower_shop = false;
      park = false;
      library = false;
      startButton.reset();
      resetButton.reset(azuki);
    });
    startButton.move(1024, 0);
    resetButton.move(1024, 64);
    game.rootScene.addChild(startButton.getButtonObject());
    game.rootScene.addChild(resetButton.getButtonObject());
  };
  game.start();
}
