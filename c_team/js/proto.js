enchant();

const gameSize = [x = 320, y = 320];
const spriteSize = [x = 32, y = 32];

window.onload = function() {
  var game = new Game(gameSize.x,gameSize.y);
  game.preload("RZukin.png", "edit_map.png");

  game.onload = function() {
    let rzukin = new Sprite(32, 32);
    rzukin.image = game.assets["RZukin.png"];
    rzukin.x = 0;
    rzukin.y = 0;
    rzukin.frame = 1;

    let square = new Sprite(320, 320);
    square.x = 0;
    square.y = 0;

    let suef = new Surface(320, 320);
    square.image = suef;
    let cont = suef.context;
    cont.beginPath();
    for(i=-1; i < 320; i += 33){
      cont.moveTo(i, 0);
      cont.lineTo(i, 320);
      cont.moveTo(0, i);
      cont.lineTo(320, i);
    }
    cont.stroke();

    let map = new Map(32,32);
    map.image = game.assets["edit_map.png"];
    let mapdata = [
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0]
    ];
    map.loadData(mapdata);

    game.rootScene.addChild(map);
    game.rootScene.addChild(square);
    game.rootScene.addChild(rzukin);
  }

  game.start();
}
