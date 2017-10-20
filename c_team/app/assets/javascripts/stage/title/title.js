$(document).ready(function() {
  enchant();
  main();
});

var screen_width = 1152; //ゲーム画面の幅
var screen_height = 640; //ゲーム画面の高さ
var tex_width = screen_width - 80; //ノベルテキストエリアの幅
var tex_heigth = 200; //ノベルテキストエリアの高さ

function main(){
  var game = new Core(screen_width, screen_height);
  game.fps = 30;
  game.rootScene.backgroundColor = "black";

  for(let i = 1; i <= 13; i++){
    game.preload("novel/" + i + ".png");
  }
  for(let i = 101; i <= 103; i++){
    game.preload("novel/" + i + ".png");
  }

  game.onload = function(){
    var scene = new Scene();
    var sprite = new Sprite(screen_width, screen_height);
    // sprite.image = game.assets['tutorial1_novel/background.jpg'];
    scene.addChild(sprite);
    game.pushScene(scene);

    // キャラクター画像の準備
    var cimg = [];
    cimg[0] = false;
    for(let i = 1; i <= 13; i++){
      cimg[i] = new Sprite(595, 842);
      cimg[i].image = game.assets["novel/"+i+".png"];
      console.log(cimg[i].image);
      if(i == 1 || i == 5 || i == 9 || i == 13) {
        cimg[i].moveTo(100, -100);
      }else{
        cimg[i].moveTo(400, -100);
      }
    }
    console.log(cimg);

    /* 以下からテキストボックスの描画 */

    /* テキストボックス */
    // Spriteオブジェクトの作成
    var sprite2 = new Sprite(1112, 200);
    sprite2.x = 20;
    sprite2.y = 420;
    // spriteオブジェクトの背景色の指定
    sprite2.backgroundColor = "rgba(100, 100, 255, 0.8)";
    // Surfaceオブジェクトの作成
    // Spriteの大きさ以上に指定しても範囲外には描画されない
    var surface = new Surface(100, 100);
    // SurfaceオブジェクトをSpriteオブジェクトのimageプロパティに代入
    sprite2.image = surface;
    // コンテキストを取得する
    var context = surface.context;
    // パスの描画の初期化
    context.beginPath();
    // 描画開始位置の移動
    context.moveTo(10, 10);

    /* 人名ボックス */
    var sprite3 = new Sprite(220, 45);
    sprite3.x = 25;
    sprite3.y = 392;
    // spriteオブジェクトの背景色の指定
    sprite3.backgroundColor = "rgba(50, 50, 255, 1)";
    // Surfaceオブジェクトの作成
    // Spriteの大きさ以上に指定しても範囲外には描画されない
    surface = new Surface(100, 100);
    // SurfaceオブジェクトをSpriteオブジェクトのimageプロパティに代入
    sprite3.image = surface;
    // コンテキストを取得する
    var context = surface.context;
    // パスの描画の初期化
    context.beginPath();
    // 描画開始位置の移動
    context.moveTo(10, 10);
    // 描画を行う
    context.stroke();
    scene.addChild(sprite2);
    scene.addChild(sprite3);
    game.pushScene(scene);

    // 画面がクリックされたならば以下が呼び出される
    sprite2.addEventListener('touchstart', function() {
      let submit = document.getElementById("tutorial1_novel");
      submit.submit();
      game.pause();
    });

    sprite3.addEventListener('touchstart', function() {
      let submit = document.getElementById("intro_novel");
      submit.submit();
      game.pause();
    });

  };
  game.start();
  window.scrollTo(0, 0);
}
