$(document).ready(function() {
  enchant();
  main();
});

function main() {
  gameSize = {x: 320, y: 320};
  spriteSize = {x: 32, y: 32};

  var game = new Game(gameSize.x, gameSize.y);
  game.preload("demo/RZukin.png", "demo/edit_map.png");

  game.onload = function() {
    var MapGroup = enchant.Class.mixClasses(Map, Group, true);
    var map = new MapGroup(spriteSize.x, spriteSize.y);
    map.image = game.assets["demo/edit_map.png"];
    map.loadData([
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0]
    ]);
    map.collisionData = [
      [1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,0,0,0,0,0,1],
      [1,1,1,1,1,1,1,1,1,1,1]
    ];

    var foregroundMap = new Map(spriteSize.x, spriteSize.y);
    foregroundMap.image = game.assets["demo/edit_map.png"];
    foregroundMap.loadData([
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
      [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    ]);
    var ruledLine = getRuledLineSprite();
    var rzukin = new Player(game, map, "demo/RZukin.png");
    // @TODO プレイヤーデータ移動
    rzukin.player.addEventListener('enterframe', function() {
      let submit = document.getElementById("demo");
      if (this.x == 256 && this.y == 64) {
        Cookies.set('status', { demo: 'top' }); // データはJSON形式で保存する
        submit.submit();
        game.pause();
      }
      if (this.x == 256 && this.y == 256) {
        Cookies.set('status', { demo: 'bottom' }); // データはJSON形式で保存する
        submit.submit();
        game.pause();
      }
    });
    var s = new MapObject(game, map, "demo/RZukin.png");
    map.addChild(foregroundMap);
    map.addChild(ruledLine);
    map.addChild(rzukin.getSprite());
    map.addChild(s.getSprite());
    game.rootScene.addChild(map);

    var button = new ButtonObject("▶️", "Running", function() {
      for (let i = 0; i < 2; i++) {
        rzukin.player.moveController.moveRight();
        rzukin.player.moveController.moveDown();
        rzukin.player.moveController.moveUp();
        rzukin.player.moveController.moveLeft();
        rzukin.player.moveController.moveLeft();
        rzukin.player.moveController.execute();
      }
    });
    button.move(140, 120);

    var resetbutton = new ButtonObject("Reset", "Running", function() {
      for (let i = 0; i < 2; i++) {
        rzukin.player.moveController.moveRight();
        rzukin.player.moveController.moveDown();
        rzukin.player.moveController.moveUp();
        rzukin.player.moveController.moveLeft();
        rzukin.player.moveController.moveLeft();
        rzukin.player.moveController.execute();
      }
    });
    resetbutton.move(200, 120);

    game.rootScene.addChild(button.getButtonObject());
    game.rootScene.addChild(resetbutton.getButtonObject());
  };
  game.start();
}

function getRuledLineSprite() {
  // 罫線
  let square = new Sprite(320, 320);
  square.x = 0;
  square.y = 0;

  let suef = new Surface(320, 320);
  square.image = suef;
  let cont = suef.context;
  cont.beginPath();
  for (let i=0; i <= 320; i += 32) {
    cont.moveTo(i, 0);
    cont.lineTo(i, 320);
    cont.moveTo(0, i);
    cont.lineTo(320, i);
  }
  cont.stroke();
  return square;
}
