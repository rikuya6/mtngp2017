$(document).ready(function() {
  enchant();
  main();
});

function main() {
  gameSize = {
    x: 1200,
    y: 675
  };
  spriteSize = {
    x: 32,
    y: 32
  };

  var game = new Game(gameSize.x,gameSize.y);
  game.preload("demo/RZukin.png", "demo/edit_map.png");

  game.onload = function() {
    var MapGroup = enchant.Class.mixClasses(Map, Group, true);
    var map = new MapGroup(spriteSize.x, spriteSize.y);
    map.image = game.assets["demo/edit_map.png"];
    map.loadData([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1]
    ]);
    map.collisionData = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    var foregroundMap = new Map(spriteSize.x, spriteSize.y);
    foregroundMap.image = game.assets["demo/edit_map.png"];
    foregroundMap.loadData([
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    ]);
    var ruledLine = getRuledLineSprite();
    var coordinate = Cookies.getJSON('coordinate');
    var rzukin = new Player(game, map, "demo/RZukin.png", coordinate.x, coordinate.y, 0);
    // @TODO プレイヤーデータ移動

    var s = new MapObject(game, map, "demo/RZukin.png", 64, 0);
    map.addChild(foregroundMap);
    map.addChild(ruledLine);
    map.addChild(rzukin.getSprite());
    map.addChild(s.getSprite());
    game.rootScene.addChild(map);

    var button = new Button("▶️");
    button.moveTo(140, 0);
    game.rootScene.addChild(button);

    button.ontouchstart = function() {
      this.text = "Running";
      for(let i = 0; i < 2; i++) {
        rzukin.player.moveController.moveRight();
        rzukin.player.moveController.moveDown();
        rzukin.player.moveController.moveLeft();
        rzukin.player.moveController.moveLeft();
        rzukin.player.moveController.execute();
      }
    };
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
  for (let i = 0; i <= gameSize.x; i += 32) {
    cont.moveTo(i, 0);
    cont.lineTo(i, gameSize.x);
    cont.moveTo(0, i);
    cont.lineTo(gameSize.x, i);
  }
  cont.stroke();
  return square;
}
