$(document).ready(function() {
  enchant();
  main();
});

function main(){
  var game = new Core(1200, 675);
  game.fps = 30;
  game.rootScene.backgroundColor = "white";
  game.preload("novel/nohara_bg.jpg");

  game.onload = function(){
    var scene = new Scene();
    var sprite = new Sprite(1200, 675);
    sprite.image = game.assets['novel/nohara_bg.jpg'];
    scene.addChild(sprite);
    game.pushScene(scene);

/*
    // enchant.ui.MutableTextはビットマップのフォントのみ使用可能
    // 日本語が一切表示不可能であることを確認した
    var tex = enchant.ui.MutableText(0, 0, 0);
    tex.setText("I AM SEVEN-ELEVEN.\n 日本語 isn't available.");
    scene.addChild(tex);
    game.pushScene(scene);


    // labelを使用した文字表示のほうが、日本語表示できることからも現実的？
    var label = new Label("アメンボ赤いなあいうえお");
    label.moveTo( 10, 50); //座標指定(X, Y)
    scene.addChild(label);
    game.pushScene(scene);
    // 文字を消すには以下を使用
    //scene.removeChild(label);
*/

    var label = []; // 物語表示のため、配列を用意する。
    var noveltext = [
      'おばあさんは突然病室を飛び出し',
      '東京駅へどこでもドアした。',
      false,
      '赤ずきん的にどこでもドアのあたりがツボで',
      '病室で笑い転げ倒しまくった。',
      false,
      'おばあさんよ',
      '早めに',
      '帰ってきてください。',
      '　　　赤ずきんより'
    ];

    // 画面がクリックされたならば以下が呼び出される
    sprite.addEventListener('touchstart', function() {
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
        var tex = new Label(work);
        tex.width = 800;
        label.push(tex); // falseじゃないなら一度に表示する分追加
      }

      // 表示の処理
      for(let i = 0; i < label.length; i++){
        label[i].moveTo( 40, 470 + i * 40);
        label[i].font = "32px 'メイリオ'"; //表示するフォントの設定 イタリックなども指定可能
        scene.addChild(label[i]);
        game.pushScene(scene);
      }
    });

    // 以下からテキストボックスの描画
    // Spriteオブジェクトの作成
    var sprite2 = new Sprite(1150, 200);
    sprite2.x = 20;
    sprite2.y = 450;
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
    // 描画を行う
    context.stroke();
    scene.addChild(sprite2);
    game.pushScene(scene);

/*
    // 背景画像を変えたい
    // window.onload内で以下を実行
    game.preload("edit_map.png"); //ファイル名を指定し、ロードしておく

    //その後、game.onload内で以下を実行
    sprite.image = game.assets['edit_map.png']; //ここでもファイル名を指定
    scene.addChild(sprite);
    game.pushScene(scene);
*/
  }
  game.start();
  window.scrollTo(0, 0);
}
