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
  for(let i = 101; i <= 112; i++){
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
      '「よし、このルートで向かおう！」', //ああああああ
      13,
      104,
      false,
      -13,
    ];

    var zundatext = [
      '<br><br>',
      '　・',
      '　・',
      '　・',
      '　・',
      110,
      -13,
      false,
      '<br><br>',
      'あずきが病院に向かって歩いていると、和菓子屋さんを見つけました。',
      1,
      111,
      false,
      'あずき',
      '「ずんだ堂だ！　おばあちゃん、苺大福が好きだったよね…',
      '　やっぱり　お花以外にも　持って行ってあげよう！」',
      false,
      '<br><br>',
      'そういうとあずきは和菓子屋さんに入って行きました。',
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
      '「おばあちゃんの好きな苺大福も買えたし、先に進もう」',
      1,
      111,
      false,
      '<br><br>',
      'あずきは　花束と苺大福の入った袋を片手に　病院の方に向かって',
      '歩き出しました。',
      false,
      '<br><br>',
      '　・',
      '　・',
      '　・',
      '　・',
      110,
      -1,
      false,
    ];
    var supertext = [
      '<br><br>',
      'あずきが　病院に向かって　歩いていると、',
      '大きなスーパーを　見つけました。',
      1,
      112,
      false,
      'あずき',
      '「スーパーだ！',
      '　ここなら　お見舞いに持っていける　果物も売ってるよね！」',
      -1,
      13,
      false,
      '<br><br>',
      'あずきは　大きなスーパーに向かって　行きました。',
      'その途中でのことです。',
      false,
      'あずき',
      '「あれ？　りんごが　こんなところに落ちてる…　ここにも…',
      '　どうしたんだろう？」',
      -13,
      9,
      false,
      '<br><br>',
      '歩いていると　ちらほらと果物が　落ちていることに',
      'あずきは気付きます。',
      false,
      'あずき',
      '「とりあえず　拾っておこうかな」',
      false,
      '<br><br>',
      'そういって　果物を　拾っていた時です。',
      false,
      '？？',
      '「あ、ごめんね！　そのりんご　私のなの！」',
      8,
      false,
      '<br><br>',
      '果物を　拾っているあずきに　声をかけてくる人が　いました。',
      false,
      'あずき',
      '「そうなんですね、この辺に落ちてた果物は　これだけです」',
      -9,
      1,
      false,
      '？？',
      '「まあ、ありがとう！　拾って集めてくれたのね」',
      false,
      'あずき',
      '「どういたしまして！」',
      -1,
      13,
      false,
      '<br><br>',
      'あずきが　拾った果物を渡して　スーパーの方に向かおうと',
      'するとその人から　呼び止められました。',
      -13,
      1,
      false,
      '？？',
      '「ちょっと待って！　もしよかったら　拾ってくれたお礼に',
      '　果物をもらってくれない？」',
      false,
      'あずき',
      '「え、いいんですか？」',
      false,
      '？？',
      '「いいのよ！　花束とか持ってるし　お見舞いに行くんでしょう？',
      '　こっちは落ちてない果物だから、安心してね」',
      false,
      'あずき',
      '「ありがとうございます！」',
      -1,
      -8,
      13,
      false,
      '<br><br>',
      'あずきは　もらった果物を大事に持って　病院まで向かいました。',
      false,
      '<br><br>',
      '　・',
      '　・',
      '　・',
      '　・',
      110,
      -13,
      false,
    ];
    var hosptext = [
      'あずき',
      '「ここが　おばあちゃんのいる病院か…',
      '　たしか病室は　207号室だったよね　早く行こうっと！」',
      1,
      108,
      false,
      '<br><br>',
      'あずきは　急ぎ足で　おばあちゃんのいる病室に　向かいました。',
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
      '「おばあちゃん　いる…？」',
      9,
      109,
      false,
    ];

    var grandmom = [
      'おばあちゃん',
      '「あら　あずき！　よくここに来れたわね！',
      '　さあ　こっちにおいで」',
      6,
      false,
      'あずき',
      '「うん！」',
      -9,
      13,
      false,
      '<br><br>',
      'あずきは　久々に会ったおばあちゃんの元に駆け寄りました。',
      false,
      'あずき',
      '「おばあちゃん　私、ここまで一人で来たの！　すごいでしょ？」',
      false,
      'おばあちゃん',
      '「あら、一人で来たの？　遠いのによく来れたわねぇ',
      '　あら　そっちに持ってるものはなあに？」',
      false,
      '<br><br>',
      'あずきはそう聞かれて　病院に来るまでに用意したものを',
      'おばあちゃんに手渡しました。',
      false,
    ];

    var flower = [
      'あずき',
      '「はい！　おばあちゃんが好きかなって思って、赤色の花束にしたの！',
    ];
    var snack = [
      '　あと、苺大福も好きだよね！',
    ];
    var apple = [
      '　この果物は　お手伝いしたから　お礼にもらったんだよ！」',
    ];
    var nonflower = [
      'あずき',
      '「お花は持ってこれなかったけど　おばあちゃんの好きな',
      '　いちご大福と　果物持ってきたよ！」',
    ];

    var grandmom2 = [
      -13,
      1,
      false,
      '<br><br>',
      'あずきの話を　おばあちゃんは嬉しそうに　聞いています。',
      false,
      'おばあちゃん',
      '「そう、一人でおばあちゃんのために　いっぱい考えてきてくれたのね',
      '　おばあちゃん　とっても嬉しいわ。',
      '　ありがとう　あずきちゃん」',
      false,
      'あずき',
      '「あずきも　おばあちゃんに喜んでもらえて　嬉しい！',
      '　ずっと寂しかったんだよ　まだお家帰ってこれないの？」',
      -1,
      9,
      false,
    ];

    var good = [
      '<br><br>',
      'そうあずきが聞くと　おばあちゃんは嬉しそうに笑って　言いました。',
      false,
      'おばあちゃん',
      '「それがね、　大したことなかったから　もう退院できるみたいなの！',
      '　今週末には帰ることができるみたい　心配かけちゃってごめんね」',
      false,
      'あずき',
      '「本当に？　よかった…！」',
      -9,
      13,
      false,
      '<br><br>',
      'あずきは　それを聞いて　とても嬉しくなりました。',
      'そして　お見舞いに来るまでに起きたことを　たくさん話しました。',
      false,
      '<br><br>',
      'あっという間に　時間が過ぎ、　あずきは　帰らないといけない時間に',
      'なりました。',
      false,
      'おばあちゃん',
      '「あら　もうこんな時間！',
      '　あずき　もうじき　あたりも暗くなるわ　お家に帰らないと」',
      -13,
      1,
      false,
      'あずき',
      '「そうだよね…',
      '　…うん　わかった」',
      -1,
      5,
      false,
      '<br><br>',
      'あずきは　寂しい気持ちをこらえます。',
      false,
      'あずき',
      '「おばあちゃん　お家で　待ってるね！」',
      -5,
      1,
      false,
      '<br><br>',
      '　・',
      '　・',
      '　・',
      '　・',
      110,
      -1,
      -6,
      false,
    ];
    var nomal = [
      '<br><br>',
      'そうあずきが聞くと　おばあちゃんは少し困ったように',
      '笑って言いました。',
      false,
      'おばあちゃん',
      '「そうね… すぐにはおうちに帰れないみたい」',
      false,
      'おばあちゃん',
      '「でもね　心配しないで',
      '　ちゃんと良くなるって　お医者さん言ってたから」',
      false,
      'あずき',
      '「ほんとう…？」',
      -9,
      13,
      false,
      'おばあちゃん',
      '「おばあちゃんは　あずきに嘘なんて　言わないわ',
      '　また今度　あずきが来れる時に　また来てくれると嬉しいわ」',
      -13,
      1,
      false,
      'あずき',
      '「もちろん！　すぐにまた来るよ',
      '　その時は　今日よりいろんなもの持ってくるね！」',
      -1,
      5,
      false,
      '<br><br>',
      'あずきは　またおばあちゃんに　会いに行こうと決心しました。',
      false,
      'あずき',
      '「おばあちゃん　また来るね！」',
      -5,
      1,
      false,
      '<br><br>',
      '　・',
      '　・',
      '　・',
      '　・',
      110,
      -1,
      -6,
      false,
    ];
    var bad = [
      '<br><br>',
      'あずきは　おばあちゃんのいる病室に　向かうことができました。',
      'ところが　あずきが声をかけても　返事がないようです。',
      false,
      'あずき',
      '「おばあちゃん…？',
      '　なんで　返事してくれないの…？',
      false,
      'おばあちゃん',
      '「………」',
      false,
      'あずき',
      '「おばあちゃん…',
      '　なんで何も言ってくれないの…？」',
      -9,
      5,
      false,
      'あずき',
      '「あずきが　悪いのかな',
      '　お母さんが　お花を持って行きなさい　とか　寄り道はダメだよ',
      '　とか言ってたの　守らなかったから…？」',
      false,
      '<br><br>',
      'あずきは　だんだんと　悲しい気持ちになってきました。',
      'あずきが話しかけた時は　いつも返事をしてくれるのに',
      '今日のおばあちゃんは　何も話してくれません。',
      false,
      'あずき',
      '「やだよ…こんなの嫌だ！！」',
      false,
      '<br><br>',
      '　・',
      '　・',
      '　・',
      '　・',
      -5,
      110,
      false,
      'あずき',
      '「………あれ…？　今のは何だったの…？',
      '　なんかすごく　嫌な夢を見ていた気がする……',
      '　おばあちゃんが　いなくなっちゃうような…？」',
      9,
      103,
      false,
      '<br><br>',
      'あずきは　ついさっきの事を思い出そうとしますが',
      'なかなか思い出すことができません。',
      false,
      'あずき',
      '「何だったんだろう…？',
      '　でもとにかく　お母さんの言うことは',
      '　しっかり守らないといけないような気がする…」',
      false,
      '<br><br>',
      'あずきがそうやって考え込んでいた時のことです。',
      false,
      'お母さん',
      '「あずき！　聞いて！',
      '　おばあちゃんがね　入院することになっちゃったの！」',
      3,
      false,
      'あずき',
      '「え…？　それって　もしかして　ゆめのなかで…！」',
      false,
    ]

    var end = [
      false,
    ];

    // Cookieフラグ管理
    var status = Cookies.getJSON('status');
    console.log(status);

    if (!(status.library_flg) && (status.zunda || status.supermarket || status.flower_flg)) {
      if (status.zunda) Array.prototype.push.apply(noveltext, zundatext);
      if (status.supermarket) Array.prototype.push.apply(noveltext, supertext);
      Array.prototype.push.apply(noveltext, hosptext);
      Array.prototype.push.apply(noveltext, grandmom);

      if (status.flower_flg) Array.prototype.push.apply(noveltext, flower);

      if ((status.zunda || status.supermarket) && !(status.flower_flg)) {
        Array.prototype.push.apply(noveltext, nonflower);
        Array.prototype.push.apply(noveltext, grandmom2);
        Array.prototype.push.apply(noveltext, nomal);
      } else if (status.zunda && status.supermarket && status.flower_flg) {
        Array.prototype.push.apply(noveltext, snack);
        Array.prototype.push.apply(noveltext, apple);
        Array.prototype.push.apply(noveltext, grandmom2);
        Array.prototype.push.apply(noveltext, good);
      } else if (status.zunda && !(status.supermarket)) {
        Array.prototype.push.apply(noveltext, snack);
        Array.prototype.push.apply(noveltext, grandmom2);
        Array.prototype.push.apply(noveltext, nomal);
      } else if (status.supermarket && !(status.zunda)) {
        Array.prototype.push.apply(noveltext, apple);
        Array.prototype.push.apply(noveltext, grandmom2);
        Array.prototype.push.apply(noveltext, nomal);
      } else {
        Array.prototype.push.apply(noveltext, grandmom2);
        Array.prototype.push.apply(noveltext, nomal);
      }
    } else {
      Array.prototype.push.apply(noveltext, hosptext);
      Array.prototype.push.apply(noveltext, bad);
    }
    Array.prototype.push.apply(noveltext, end);


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
        let submit = document.getElementById("title");
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
