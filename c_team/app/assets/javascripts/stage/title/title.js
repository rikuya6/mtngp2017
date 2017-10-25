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

  game.preload("novel/title.png");

  game.onload = function(){
    var scene = new Scene();
    var sprite = new Sprite(screen_width, screen_height);
    sprite.image = game.assets['novel/title.png'];
    scene.addChild(sprite);
    game.pushScene(scene);

    /* チュートリアルへのボタン */
    // Spriteオブジェクトの作成
    var sprite2 = new Sprite(screen_width - 500, 70);
    sprite2.x = 400;
    sprite2.y = 420;
    // spriteオブジェクトの背景色の指定
    sprite2.backgroundColor = "rgba(255, 175, 0, 0.6)";
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

    /* 本編へのボタン */
    var sprite3 = new Sprite(screen_width - 500, 70);
    sprite3.x = 400;
    sprite3.y = 520;
    // spriteオブジェクトの背景色の指定
    sprite3.backgroundColor = "rgba(50, 50, 255, 0.6)";
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

    // テキスト表示
    var tex = new Label("チュートリアルをはじめる");
    var tex2 = new Label("ゲームをはじめる");
    tex.width = tex_width;
    tex2.width = tex_width;
    tex.moveTo( 440, 435);
    tex2.moveTo( 440, 535);
    tex.font = "32px 'Meiryo'";
    tex2.font = "32px 'Meiryo'";
    tex.color = "white";
    tex2.color = "white";
    // if(i % 2 == 0)   label[i].color = "red";
    scene.addChild(tex);
    scene.addChild(tex2);
    game.pushScene(scene);

    /* バグ対策 */
    var sprite4 = new Sprite(screen_width - 500, 70);
    sprite4.x = 400;
    sprite4.y = 420;
    sprite4.backgroundColor = "rgba(0, 0, 0, 0)";
    var surface = new Surface(100, 100);
    sprite4.image = surface;
    var context = surface.context;
    context.beginPath();
    context.moveTo(10, 10);

    var sprite5 = new Sprite(screen_width - 500, 70);
    sprite5.x = 400;
    sprite5.y = 520;
    sprite5.backgroundColor = "rgba(0, 0, 0, 0)";
    surface = new Surface(100, 100);
    sprite5.image = surface;
    var context = surface.context;
    context.beginPath();
    context.moveTo(10, 10);
    context.stroke();
    scene.addChild(sprite4);
    scene.addChild(sprite5);
    game.pushScene(scene);

    // 画面がクリックされたならば以下が呼び出される
    sprite4.addEventListener('touchstart', function() {
      let submit = document.getElementById("tutorial1_novel");
      submit.submit();
      game.pause();
    });

    sprite5.addEventListener('touchstart', function() {
      let submit = document.getElementById("intro_novel");
      submit.submit();
      game.pause();
    });

  };
  game.start();
  window.scrollTo(0, 0);
}
