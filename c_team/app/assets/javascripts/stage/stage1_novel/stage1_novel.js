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
  for(let i = 101; i <= 110; i++){
    game.preload("novel/" + i + ".jpg");
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

    var label = []; // 物語表示のため、配列を用意する。
    var noveltext = [
      'あずき',
      'ここに直通したときの文章が来ます。',
      13,
      104,
      false,
      false,
    ];

    var flower = [
      'あずき',
      '「よし　決めた！」',
      13,
      101,
      false,
      '<br><br>',
      '行き方を決めたあずきは　地図を片手に　歩き出しました。',
      'そして　バス停に向かう途中で　花屋さんの前を　通りかかりました。',
      105,
      false,
      'あずき',
      '「あ、　お花屋さん！　おばあちゃん何色が　好きだったかな…？」',
      -13,
      1,
      false,
      '<br><br>',
      '　・',
      '　・',
      '　・',
      '　・',
      110,
      -1,
      false,
      'あずき',
      '「よかった、ちゃんとお花も買えたし、あとは',
      '　バス停に向かって　歩くだけだね」',
      105,
      13,
      false,
      '<br><br>',
      'あずきは　今さっき買ったばかりの　花束を大事に持って',
      '歩いて行きました。',
      'そして　無事に　バス停まで　向かうことが　できました。',
      -13,
      false,
      'あずき',
      '「乗る予定のバスよりも　余裕を持って　着いちゃった！」',
      13,
      104,
      false,
      '<br><br>',
      'あずきが　バス停に着いてから　１０分後、',
      '乗る予定のバスが　到着しました。',
      false,
      false
    ];

    var park = [
      'あずき',
      '「よし　決めた！」',
      13,
      101,
      false,
      '<br><br>',
      '行き方を決めたあずきは　地図を片手に　歩き出しました。',
      'そしてバス停に　向かう途中で　あずきは　公園の前を',
      '通りかかりました。',
      -13,
      1,
      106,
      false,
      '？',
      '「あずき！」',
      false,
      'あずき',
      '「あ、きなこちゃん！　どうしたの？」',
      4,
      false,
      'きなこ',
      '「あずき、どこ行くの？　遊ばないの？」',
      false,
      'あずき',
      '「これからおばあちゃんのところに　お見舞いに行くところなの」',
      -1,
      13,
      false,
      'きなこ',
      '「えーそうなの？　ちょっと遊んでからにしようよ！',
      '　今から鬼ごっこするのに、こないの？」',
      -13,
      1,
      false,
      'あずき',
      '「うーん…　じゃあちょっとだけ…」',
      -1,
      9,
      false,
      '<br><br>',
      'あずきは　遊びに誘われて　公園に向かいました。',
      false,
      'あずき',
      '「お花屋さんは　後で向かえば　いいよね」',
      -9,
      1,
      false,
      '<br><br>',
      'そう考えて　あずきは　お見舞いのお花を　買うことを',
      '後回しにしました。',
      false,
      '<br><br>',
      '　・',
      '　・',
      '　・',
      '　・',
      -1,
      -4,
      110,
      false,
      'あずき',
      '「あ、もうこんな時間！　私そろそろ行くね！」',
      106,
      9,
      4,
      false,
      'きなこ',
      '「そっか　もう行っちゃうの？　また学校でね！」',
      false,
      '<br><br>',
      'あずきは　まだ遊んでいたい　気持ちを抑えて',
      '花屋さんに　向かいました。',
      -4,
      1,
      false,
      110,
      '<br><br>',
      '　・',
      '　・',
      '　・',
      '　・',
      -1,
      -9,
      false,
      '<br><br>',
      'あずきが　花屋さんの前を　通りかかった　時のことです。',
      105,
      1,
      false,
      'あずき',
      '「あれ？　もしかして、花屋さん　やってないのかな…？」',
      -1,
      9,
      false,
      '<br><br>',
      'お店の　入り口は　締め切られ、入れなくなっていました。',
      false,
      'あずき',
      '「どうしよう…　でもお花屋さんなんて ここしかないし、',
      '　ここで待ってても バスに 乗り遅れちゃうよね…」',
      110,
      -9,
      5,
      false,
      '<br><br>',
      'そういうと あずきは 花屋さんで花を買うのを 諦めることにしました。',
      false,
      'あずき',
      '「お母さんも 買えたらでいいって　言ってたし、',
      '　お花の　代わりになるものが　これから見つかるよね」',
      false,
      '<br><br>',
      'あずきが　バス停に着くと　丁度乗る予定の　バスが着きました。',
      false,
      false
    ];

    var library = [
      'あずき',
      '「よし　決めた！」',
      13,
      101,
      false,
      '<br><br>',
      '行き方を決めたあずきは　地図を片手に　歩き出しました。',
      'そしてバス停に　向かう途中で　あずきは　図書館を　見つけました。',
      '実はあずきは　本を読むのが　大好きなのです。',
      -13,
      1,
      107,
      false,
      'あずき',
      '「図書館だ！」',
      -1,
      13,
      false,
      '<br><br>',
      'あずきは　新しい本を探しに　図書館の中へ　向かっていきます。',
      false,
      'あずき',
      '「まだ時間あるし、ちょっと　くらいなら　寄ってもいいよね…」',
      -13,
      1,
      false,
      '<br><br>',
      '　・',
      '　・',
      '　・',
      '　・',
      110,
      -1,
      false,
      'あずき',
      '「え！　もう　こんな時間だ！」',
      107,
      5,
      false,
      '<br><br>',
      'あずきが　本来乗ろうとしていたバスが来る時間は',
      'とっくに　過ぎていました。',
      false,
      'あずき',
      '「大変！　いそがないと！」',
      false,
      '<br><br>',
      'あずきは　急いでバス停まで　向かいます。',
      false,
      '<br><br>',
      '　・',
      '　・',
      '　・',
      '　・',
      110,
      -5,
      false,
      '<br><br>',
      'そこに　タイミング良く　病院に向かうバスが　やってきました。',
      104,
      false,
      'あずき',
      '「よかった、あのバスに乗って行けば　まだ間に合うよね」',
      1,
      false,
      false
    ];

    // Cookieフラグ管理
    var status = Cookies.getJSON('status');
    console.log(status);
    if (status.flower_flg && !(status.park_flg) && !(status.library_flg)) noveltext = flower;
    else {
      // if (status.flower_flg) noveltext = flower;
      if (status.park_flg) noveltext = park;
      if (status.library_flg) noveltext = library;
    }

    /* 以下からテキストボックスの描画 */

    /* テキストボックス */
    // Spriteオブジェクトの作成
    var sprite2 = new Sprite(1112, 200);
    sprite2.x = 20;
    sprite2.y = 420;
    // spriteオブジェクトの背景色の指定
    sprite2.backgroundColor = "rgba(50, 50, 255, 0.8)";
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

    /* 最初のテキストの表示 */
    while(true){
      let work = noveltext[0];
      noveltext.splice(0, 1); // noveltext０番目から１つ削除
      if (!(work)) break;  // 配列noveltextにはfalseがある。

      // 以下、キャラクター表示の指示が来た場合の処理
      if (!(isNaN(work))) {
        console.log("work:" + work);
        // キャラクターがボックスの前に来ちゃうので一度取り除く
        scene.removeChild(sprite2);
        scene.removeChild(sprite3);
        if (work > 100) {
          sprite.image = game.assets['novel/' + work + '.jpg'];
          //break;
        }else if (work > 0){
          scene.addChild(cimg[work]);
          game.pushScene(scene);
        }else{ // マイナスが来た場合、非表示にする
          scene.removeChild(cimg[work * -1]);
        }
        // 再度ボックス表示
        scene.addChild(sprite2);
        scene.addChild(sprite3);
        game.pushScene(scene);
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
        let work = noveltext[0];
        noveltext.splice(0, 1); // noveltext０番目から１つ削除
        if (!(work)) break;  // 配列noveltextにはfalseがある。

        // 以下、キャラクター表示の指示が来た場合の処理
        if (!(isNaN(work))) {
          console.log("work:" + work);
          // キャラクターがボックスの前に来ちゃうので一度取り除く
          scene.removeChild(sprite2);
          scene.removeChild(sprite3);
          if (work > 100) {
            sprite.image = game.assets['novel/' + work + '.jpg'];
            //break;
          }else if (work > 0){
            scene.addChild(cimg[work]);
            game.pushScene(scene);
          }else{ // マイナスが来た場合、非表示にする
            scene.removeChild(cimg[work * -1]);
          }
          // 再度ボックス表示
          scene.addChild(sprite2);
          scene.addChild(sprite3);
          game.pushScene(scene);
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
        let submit = document.getElementById("stage2_novel");
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
