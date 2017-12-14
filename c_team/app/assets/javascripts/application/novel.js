class Novel {
  constructor(noveltext, getCimg, submitIdName) {
    this.game = new Game(screen_width, screen_height);
    this.game.self = this;
    this.game.fps = 30;
    this.game.rootScene.backgroundColor = "black";
    this.noveltext = noveltext;
    this.self = this;
    this.submitIdName = submitIdName;
    this.getCimg = getCimg;

    this.game.onload = function() {
      this.self.main();
    };
    this.imagePreload();
    this.game.start();
    window.scrollTo(0, 0);
  }

  imagePreload() {
    for(let i = 1; i <= 13; i++) {
      this.game.preload("novel/" + i + ".png");
    }
    for(let i = 102; i <= 118; i++) {
      this.game.preload("novel/" + i + ".jpg");
    }
  }

  main() {
    let scene = new Scene();
    let sprite = new Sprite(screen_width, screen_height);
    scene.addChild(sprite);
    this.game.pushScene(scene);

    // キャラクター画像の準備
    let cimg = this.getCimg();

    let label = []; // 物語表示のため、配列を用意する。

    /* 以下からテキストボックスの描画 */

    /* テキストボックス */
    // Spriteオブジェクトの作成
    let sprite2 = new Sprite(1112, 200);
    sprite2.x = 20;
    sprite2.y = 420;
    // spriteオブジェクトの背景色の指定
    sprite2.backgroundColor = "rgba(50, 50, 255, 0.8)";
    // Surfaceオブジェクトの作成
    // Spriteの大きさ以上に指定しても範囲外には描画されない
    let surface = new Surface(100, 100);
    // SurfaceオブジェクトをSpriteオブジェクトのimageプロパティに代入
    sprite2.image = surface;
    // コンテキストを取得する
    let context = surface.context;
    // パスの描画の初期化
    context.beginPath();
    // 描画開始位置の移動
    context.moveTo(10, 10);

    /* 人名ボックス */
    let sprite3 = new Sprite(220, 45);
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
    context = surface.context;
    // パスの描画の初期化
    context.beginPath();
    // 描画開始位置の移動
    context.moveTo(10, 10);
    // 描画を行う
    context.stroke();
    scene.addChild(sprite2);
    scene.addChild(sprite3);
    this.game.pushScene(scene);

    /* 最初のテキストの表示 */
    while(true){
      let work = this.noveltext[0];
      this.noveltext.splice(0, 1); // this.noveltext０番目から１つ削除
      if (!(work)) break;  // 配列this.noveltextにはfalseがある。

      // 以下、キャラクター表示の指示が来た場合の処理
      if (!(isNaN(work))) {
        // キャラクターがボックスの前に来ちゃうので一度取り除く
        scene.removeChild(sprite2);
        scene.removeChild(sprite3);
        if (work > 100) {
          sprite.image = this.game.assets['novel/' + work + '.jpg'];
          //break;
        }else if (work > 0){
          scene.addChild(cimg[work]);
          this.game.pushScene(scene);
        }else{ // マイナスが来た場合、非表示にする
          scene.removeChild(cimg[work * -1]);
        }
        // 再度ボックス表示
        scene.addChild(sprite2);
        scene.addChild(sprite3);
        this.game.pushScene(scene);
        continue;
      }

      // 以下、通常通りテキストを表示する処理
      let tex = new Label(work);
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
      this.game.pushScene(scene);
    }

    /* どこをクリックしてもすすめるようにするためのすぷらいとくん */
    let sprite4 = new Sprite(screen_width, screen_height);
    sprite4.novelObj = this;
    scene.addChild(sprite4);
    this.game.pushScene(scene);

    // 画面がクリックされたならば以下が呼び出される
    sprite4.addEventListener('touchstart', function() {
      // sprite.image = this.game.assets['tutorial1_novel/nohara_bg.jpg'];

      // 既に表示されていた文字を消す
      let len = label.length;
      for(let i = 0; i < len; i++){
        scene.removeChild(label[0]);
        label.splice(0, 1);
      }

      // 文字表示するための処理
      // labelという配列にどんどん追加していく
      while(true){
        let work = this.novelObj.noveltext.splice(0, 1)[0]; // this.novelObj.noveltext０番目から１つ削除
        if (!(work)) break;  // 配列this.novelObj.noveltextにはfalseがある。

        // 以下、キャラクター表示の指示が来た場合の処理
        if (!(isNaN(work))) {
          // キャラクターがボックスの前に来ちゃうので一度取り除く
          scene.removeChild(sprite2);
          scene.removeChild(sprite3);
          if (work > 1000) { // 1000以上は文字色管理
            label.push(work);
          }else if (work > 100) {
            sprite.image = this.novelObj.game.assets['novel/' + work + '.jpg'];
            //break;
          }else if (work > 0){
            scene.addChild(cimg[work]);
            this.novelObj.game.pushScene(scene);
          }else{ // マイナスが来た場合、非表示にする
            scene.removeChild(cimg[work * -1]);
          }
          // 再度ボックス表示
          scene.addChild(sprite2);
          scene.addChild(sprite3);
          this.novelObj.game.pushScene(scene);
          continue;
        }
        // 以下、通常通りテキストを表示する処理
        var tex = new Label(work);
        tex.width = tex_width;
        label.push(tex); // falseじゃないなら一度に表示する分追加
      }

      // // 表示の処理
      // for(let i = 0; i < label.length; i++){
      //   label[i].moveTo( 40, 400 + i * 40);
      //   label[i].font = "32px 'メイリオ'";
      //   label[i].color = "white";
      //   // if(i % 2 == 0)   label[i].color = "red";
      //   scene.addChild(label[i]);
      //   this.novelObj.game.pushScene(scene);
      // }

      // 表示の処理
      let index = 0; // インデックス管理に必須
      for(let i = 0; i < label.length; i++) {
        if (label[i] > 1000){ //文字色変更信号
          // console.log(col[label[i]]);
          continue;
        }else if (label[i - 1] > 1000){
          label[i].color = col[label[i-1]];
        }else{
          label[i].color = "white"; // 通常色
        }
        label[i].moveTo( 40, 400 + index * 40);
        label[i].font = "32px 'メイリオ'";
        // label[i].color = "white";
        // if(i % 2 == 0)   label[i].color = "red";
        scene.addChild(label[i]);
        this.novelObj.game.pushScene(scene);
        index++;
      }

      if(this.novelObj.noveltext.length == 0){
        let submit = document.getElementById(this.novelObj.submitIdName);
        submit.submit();
        this.novelObj.game.pause();
      }

      // バグ防止
      scene.addChild(sprite4);
      this.novelObj.game.pushScene(scene);
    });
  }
}
