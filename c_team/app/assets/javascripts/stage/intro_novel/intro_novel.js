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

  for(var i = 1; i <= 13; i++){
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
    for(var i = 1; i <= 13; i++){
      let p = i % 4 + 1;
      cimg[i] = new Sprite(595, 842);
      cimg[i].image = game.assets["novel/"+i+".png"];
      console.log(i + ".png = " + p);
      cimg[i].moveTo(p * 100, -100);
    }
    console.log(cimg);

    var label = []; // 物語表示のため、配列を用意する。
    var noveltext = [
      '<br><br>',
      'あるところに　あずきという　女の子がいました。',
      '<br><br>',
      'あずきのお父さんとお母さんは　お仕事があるので',
      '学校から帰ってくると　家にはいつもおばあちゃんがいました。',
      1,
      '<br><br>',
      'ところがある日、　おばあちゃんは　入院することになって',
      'しまいました。',
      '<br><br>',
      'おばあちゃんが　入院してから　数日後のことです。',
      9,
      false,
      'あずき',
      '「やっぱり　おばあちゃんに　会えないのはさびしい…',
      '　そうだ、　おばあちゃんに　会いに行けばいいんだ！」',
      false,
      '<br><br>',
      'そう思い立ったところで　あずきは　病院への行き方を　知りません。',
      '<br><br>',
      'そこで　お母さんに　相談することに　しました。',
      false,
      'あずき',
      '「ねえお母さん、　私、　おばあちゃんに　会えなくてさびしい…',
      '　おばあちゃんに　会いに行けないの？」',
      false,
      'お母さん',
      '「そうね…　さびしいのも　わかるけれど、',
      '　お母さんたち　今日は　お仕事があるから　一緒に行くことが',
      '　できないの」',
      false,
      'あずき',
      '「私　ひとりでも　行く！　病院には　どうやって行くの？」',
      -9,
      1,
      false,
      'お母さん',
      '「病院へは　バスを使って　行くのよ',
      '　家のそばの　バス停から　「総合病院行き」　に乗って',
      '　５個目で　バス停を降りるの」',
      false,
      'お母さん',
      '「そこから　１０分くらいのところに　おばあちゃんのいる',
      '　病院があるわ',
      '　おばあちゃんの病室は　207号室なんだけど…」',
      false,
      'お母さん',
      '「一回で　覚えられるわけ　ないわね　メモを書いてあげるから',
      '　待ってなさい」',
      false,
      '<br><br>',
      'あずきは　お母さんから　病院までの　行き方が書いてある',
      'メモをもらいました。',
      false,
      'あずき',
      '「ありがとう」',
      false,
      'お母さん',
      '「もしあずきに　余裕があるなら　行く途中にある',
      '　お花屋さんで　お花を買っていったら　おばあちゃん喜ぶと思うよ」',
      false,
      'あずき',
      '「うん　わかった」',
      false,
      '<br><br>',
      'あずきは　身支度を済ませると　おばあちゃんのいる',
      '病院へ向かうべく　家を出ました。',
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
            sprite.image = game.assets['novel/' + work + '.png'];
            break;
          }else if (work > 0){
            scene.removeChild(sprite2);
            scene.addChild(cimg[work]);
            game.pushScene(scene);
            scene.addChild(sprite2);
            game.pushScene(scene);
          }else{ // マイナスが来た場合、非表示にする
            scene.removeChild(cimg[work * -1]);
          }
          continue;
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
        let submit = document.getElementById("intro_novel");
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
