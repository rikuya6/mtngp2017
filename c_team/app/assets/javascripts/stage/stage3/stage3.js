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
  game.preload("azuki_walk.png", "road.png", "objects.png", "color_cone.png", "stage3/signboard_right.png");

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
      [2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2],
      [2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2],
      [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 3, 3],
      [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 3, 3],
      [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3],
      [2, 2, 0, 0, 2, 0, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 3, 3],
      [2, 0, 0, 0, 2, 0, 2, 2, 0, 2, 2, 0, 2, 0, 2, 2, 0, 3, 3],
      [2, 0, 0, 0, 2, 0, 2, 2, 0, 2, 2, 0, 0, 0, 2, 2, 0, 3, 3],
      [2, 0, 2, 0, 2, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 3, 3],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 3, 3],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3]
    ];

    var foregroundMap = new Map(spriteSize.x, spriteSize.y);
    foregroundMap.image = game.assets["objects.png"];
    foregroundMap.loadData([
      [ 5,  5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 12, 13,  5,  5, -1, -1],
      [ 5,  5, 18, -1, -1, -1, -1, -1,  5,  5, -1, -1, -1, -1, -1, -1, -1, -1],
      [ 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  5,  5,  5,  5, -1, -1, -1],
      [ 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  5,  5,  5,  5, -1, -1, -1],
      [ 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [ 5, -1, -1,  5, -1,  5,  5, -1, -1, -1, -1, -1, -1,  5,  5, -1, -1, -1],
      [-1, -1, -1,  5, -1,  5,  5, -1,  5,  5, -1, 29, -1,  5,  5, -1, -1, -1],
      [-1, -1, -1,  5, -1,  5,  5, -1,  5,  5, -1, -1, -1,  5,  5, -1, -1, -1],
      [-1, 28, -1,  5, -1, -1, -1, -1,  5,  5, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1,  5,  5, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    ]);
    // var ruledLine = (new RuledLine()).getSprite();
    let azuki = new Player(game, map, "azuki_walk.png", 128, 128, 2);
    let submit = document.getElementById("ending_novel");
    let zunda_flag = false;
    let supermarket_flag = false;
    azuki.player.addEventListener('enterframe', function () {
      // ずんだ堂
      if (this.x == 64 && this.y == 576) zunda_flag = true;
      // スーパーマーケット
      if (this.x == 764 && this.y == 448) supermarket_flag = true;
      // 病院
      if ((this.x == 768 && this.y == 64) || (this.x == 832 && this.y == 64))  {
        Cookies.set('status', {
          stage1: true,
          stage2: true,
          stage3: { clear: true, zunda: zunda_flag, supermarket: supermarket_flag }
        }); // データはJSON形式で保存する
        submit.submit();
        game.pause();
      }
    });
    var o1 = new MapObject(game, map, azuki.player.moveController, "color_cone.png", 1024, 128, 3);
    var o2 = new MapObject(game, map, azuki.player.moveController, "color_cone.png", 1088, 128, 3);
    var o3 = new MapObject(game, map, azuki.player.moveController, "color_cone.png", 1024, 192, 3);
    var o4 = new MapObject(game, map, azuki.player.moveController, "color_cone.png", 1088, 192, 3);
    var o5 = new MapObject(game, map, azuki.player.moveController, "color_cone.png", 1024, 256, 3);
    var o6 = new MapObject(game, map, azuki.player.moveController, "color_cone.png", 1088, 256, 3);
    var o7 = new MapObject(game, map, azuki.player.moveController, "color_cone.png", 1024, 320, 3);
    var o8 = new MapObject(game, map, azuki.player.moveController, "stage3/signboard_right.png", 1088, 320, 4);
    map.addChild(foregroundMap);
    // map.addChild(ruledLine);
    map.addChild(azuki.getSprite());
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
      azuki.player.moveController.setHitTurnLeftOrRight();
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
