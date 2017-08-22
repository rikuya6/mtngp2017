enchant();

const gameSize = [x = 320, y = 320]

window.onload = function() {
  var game = new Game(gameSize.x,gameSize.y);
  game.preload("RZukin.png");

  game.onload = function() {
    let rzukin = new Sprite(32, 32);
    rzukin.image = game.assets["RZukin.png"];
    rzukin.x = 0;
    rzukin.y = 0;
    rzukin.frame = 1;
    game.rootScene.addChild(rzukin);
  }

  game.start();
}
