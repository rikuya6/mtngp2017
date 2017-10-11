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

  game.preload("tutorial1_novel/nohara_bg.jpg", "tutorial1_novel/1.png", "tutorial1_novel/101.png", "tutorial1_novel/background.jpg");

  game.onload = function(){
    var scene = new Scene();
    var sprite = new Sprite(screen_width, screen_height);
    // sprite.image = game.assets['tutorial1_novel/background.jpg'];
    scene.addChild(sprite);
    game.pushScene(scene);

    // キャラクター画像の準備
    var cimg = [];
    for(var i = 1; i <= 1; i++){
      cimg[i] = new Sprite(300, 450);
      cimg[i].image = game.assets["tutorial1_novel/"+i+".png"];
      cimg[i].moveTo(20 + i * 300, 70);
    }

    var label = []; // 物語表示のため、配列を用意する。
    var noveltext = [
      '絵本描き',
      '「やぁ。君が僕の本を手伝ってくれるって子かい？',
      false,
      '絵本描き',
      '「僕はここでずっと絵本を書いているんだ。」',
      false,
      '絵本描き',
      '「これから君には僕の絵本の登場人物を動かすのを手伝ってもらうよ。」',
      false,
      '絵本描き',
      '「まずは聞くよりやってみよう。この子を動かして前に進めて',
      '　やってくれ。」',
      false,
      101,
      '<br><br>',
      '<stage1  実行しよう>',
      '<br>数マス前のゴールに進むコードが設定されているので、実行を押して',
      '<br>ゴールに行かせてあげよう。',
      false,
      '？',
      '「登場人物は左のブロックの通りに動きます。',
      '　実行ボタンを押すとその通りに動くよ。動かしてみよう。」',
      false,
      false
    ];

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
    context = surface.context;
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
    var surface = new Surface(100, 100);
    // SurfaceオブジェクトをSpriteオブジェクトのimageプロパティに代入
    sprite3.image = surface;
    // コンテキストを取得する
    context = surface.context;
    // パスの描画の初期化
    context.beginPath();
    // 描画開始位置の移動
    context.moveTo(10, 10);
    // 描画を行う
    context.stroke();
    scene.addChild(sprite2);
    scene.addChild(sprite3);
    game.pushScene(scene);

    /* 最初のテキストの表示 */
    while(true){
      var work = noveltext[0];
      noveltext.splice(0, 1); // noveltext０番目から１つ削除
      if (!(work)) break;  // 配列noveltextにはfalseがある。

      // 以下、キャラクター表示の指示が来た場合の処理
      if (!(isNaN(work))) {
        if (work > 0){
          scene.removeChild(sprite2);
          scene.addChild(cimg[work]);
          game.pushScene(scene);
          scene.addChild(sprite2);
          game.pushScene(scene);
        }else{ // マイナスが来た場合、非表示にする
          scene.removeChild(cimg[work * -1]);
        }
        break;
      }

      // 以下、通常通りテキストを表示する処理
      var tex = new Label(work);
      tex.width = tex_width;
      label.push(tex); // falseじゃないなら一度に表示する分追加
    }

    // 表示の処理
    for(let i = 0; i < label.length; i++){
      label[i].moveTo( 40, 400 + i * 40);
      label[i].font = "32px 'メイリオ'";
      label[i].color = "white";
      // if(i % 2 == 0)   label[i].color = "red";
      scene.addChild(label[i]);
      game.pushScene(scene);
    }


    /* どこをクリックしてもすすめるようにするためのすぷらいとくん */
    var sprite4 = new Sprite(screen_width, screen_height);
    scene.addChild(sprite4);
    game.pushScene(scene);

    // 画面がクリックされたならば以下が呼び出される
    sprite4.addEventListener('touchstart', function() {
      // sprite.image = game.assets['tutorial1_novel/nohara_bg.jpg'];

      // 既に表示されていた文字を消す
      var len = label.length;
      for(let i = 0; i < len; i++){
        console.log(label[0]);
        scene.removeChild(label[0]);
        label.splice(0, 1);
      }

      // 文字表示するための処理
      // labelという配列にどんどん追加していく
      while(true){
        var work = noveltext[0];
        noveltext.splice(0, 1); // noveltext０番目から１つ削除
        if (!(work)) break;  // 配列noveltextにはfalseがある。

        // 以下、キャラクター表示の指示が来た場合の処理
        if (!(isNaN(work))) {
          if (work > 100) {
            sprite.image = game.assets['tutorial1_novel/' + work + '.png'];
          }else if (work > 0){
            scene.removeChild(sprite2);
            scene.addChild(cimg[work]);
            game.pushScene(scene);
            scene.addChild(sprite2);
            game.pushScene(scene);
          }else{ // マイナスが来た場合、非表示にする
            scene.removeChild(cimg[work * -1]);
          }
          break;
        }

        // 以下、通常通りテキストを表示する処理
        var tex = new Label(work);
        tex.width = tex_width;
        label.push(tex); // falseじゃないなら一度に表示する分追加
      }

      // 表示の処理
      for(let i = 0; i < label.length; i++){
        label[i].moveTo( 40, 400 + i * 40);
        label[i].font = "32px 'メイリオ'";
        label[i].color = "white";
        // if(i % 2 == 0)   label[i].color = "red";
        scene.addChild(label[i]);
        game.pushScene(scene);
      }

      if(noveltext.length == 0){
        let submit = document.getElementById("tutorial1_novel");
        submit.submit();
        game.pause();
      }

      // バグ防止
      scene.addChild(sprite4);
      game.pushScene(scene);
    });
  };
  game.start();
  window.scrollTo(0, 0);
}
