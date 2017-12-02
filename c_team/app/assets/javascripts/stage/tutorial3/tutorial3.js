$(document).ready(function() {
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
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
      [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
    ]);
    map.collisionData = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 3],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 3],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 3],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 3],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 3],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 3],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 3],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3]
    ];

    var foregroundMap = new Map(spriteSize.x, spriteSize.y);
    foregroundMap.image = game.assets["objects.png"];
    foregroundMap.loadData([
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14, 17, 17],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14, 17, 17],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14, 17, 17],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14, 17, 17],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14, 17, 17],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 24, 17, 17],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14, 17, 17],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14, 17, 17],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14, 17, 17],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14, 17, 17],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 14, 17, 17]
    ]);
    let ruledLine = (new RuledLine()).getSprite();
    let azuki = new Player(game, map, "azuki_walk.png", 0, 0, 0);
    let submit = document.getElementById("tutorial3");
    azuki.player.addEventListener('enterframe', function () {
      if (this.x == 960 && this.y == 320) {
        if (azuki.player.moveController.getMoveCount() <= 20) {
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
    (new MapObject(game, map, azuki.player.moveController, "color_cone.png", 3)).appendMap(map);
    var startButton = new StartButton(function () {
      azuki.player.moveController.setHitTurnRightOrLeft();
      azuki.player.moveController.moveStraight();
      azuki.player.moveController.execute();
      resetButton.enable();
      startButton.disable();
    });
    var resetButton = new RsetButton(function () {
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
