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
      [ 5,  5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 12, 13,  5,  5, 17, 17],
      [ 5,  5, 18, -1, -1, -1, -1, -1,  5,  5, -1, -1, -1, -1, -1, -1, 17, 17],
      [ 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  5,  5,  5,  5, -1, 17, 17],
      [ 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,  5,  5,  5,  5, -1, 17, 17],
      [ 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 17, 17],
      [ 5, -1, -1,  5, -1,  5,  5, -1, -1, -1, -1, -1, -1,  5,  5, -1, 17, 17],
      [-1, -1, -1,  5, -1,  5,  5, -1,  5,  5, -1, 29, -1,  5,  5, -1, 17, 17],
      [-1, -1, -1,  5, -1,  5,  5, -1,  5,  5, -1, -1, -1,  5,  5, -1, 17, 17],
      [-1, 28, -1,  5, -1, -1, -1, -1,  5,  5, -1, -1, -1, -1, -1, -1, 17, 17],
      [-1, -1, -1, -1, -1, -1, -1, -1,  5,  5, -1, -1, -1, -1, -1, -1, 17, 17],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 17, 17]
    ]);
    // var ruledLine = (new RuledLine()).getSprite();
    let azuki = new Player(game, map, "azuki_walk.png", 128, 128, 2);
    let submit = document.getElementById("ending_novel");
    let zunda_flg = false;
    let supermarket_flg = false;
    azuki.player.addEventListener('enterframe', function () {
      // ずんだ堂
      if (this.x == 64 && this.y == 576) zunda_flg = true;
      // スーパーマーケット
      if (this.x == 704 && this.y == 448) supermarket_flg = true;
      // 病院
      if ((this.x == 768 && this.y == 64) || (this.x == 832 && this.y == 64))  {
        let status = Cookies.getJSON('status');
        let addStatus = {
          stage3: true,
          zunda: zunda_flg,
          supermarket: supermarket_flg
        };
        Object.assign(status, addStatus);
        Cookies.set('status', status);
        submit.submit();
        game.pause();
      }
    });

    map.addChild(foregroundMap);
    // map.addChild(ruledLine);
    map.addChild(azuki.getSprite());
    game.rootScene.addChild(map);

    for(let i = 0; i < 7; i++)
      (new MapObject(game, map, azuki.player.moveController, "color_cone.png", 3)).appendMap(map);
    (new MapObject(game, map, azuki.player.moveController, "stage3/signboard_right.png", 4)).appendMap(map);

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
