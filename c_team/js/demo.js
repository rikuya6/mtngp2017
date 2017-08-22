enchant(); // enchant.js 初期化

window.onload = function Main() {
  var game = new Game(320, 320);
  game.preload("chara1.png");
  game.onload = function() {
    bear = new Sprite(32, 32);
    bear.image = game.assets["chara1.png"];
    bear.x = 0;
    bear.y = 0;
    bear.frame = 5;
    game.rootScene.addChild(bear);
    bear.addEventListener("enterframe", function() {
      this.x += 1;
      // this.frame = this.age % 2 + 6;
      if(this.age % 8 == 0){
        this.frame = (this.frame + 1) % 2 + 6;
      }
      if(320 < this.x){
        this.x = -32;
      }
    });
    // bear.addEventListener("touchstart", function() {
    //   game.rootScene.removeChild(bear);
    // });
  };
  game.start();
};
