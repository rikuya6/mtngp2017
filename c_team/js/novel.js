enchant();
window.onload = function(){
  var game = new Core(320, 320);
  game.fps = 30;
  game.rootScene.backgroundColor = "white";
  game.preload("background.jpg");

  game.onload = function(){
    var scene = new Scene();
    var sprite = new Sprite(320, 320);
    sprite.image = game.assets['background.jpg'];
    scene.addChild(sprite);
    game.pushScene(scene);

/*
  文字消しに難あり
  要バグ修正
*/


    // enchant.ui.MutableTextはビットマップのフォントのみ使用可能
    // 日本語が一切表示不可能であることを確認した
    var tex = enchant.ui.MutableText(0, 0, 0);
    tex.setText("I AM SEVEN-ELEVEN.\n 日本語 isn't available.");
    scene.addChild(tex);
    game.pushScene(scene);


    // labelを使用した文字表示のほうが、日本語表示できることからも現実的？
    var label = new Label("アメンボ赤いなあいうえお");
    label.moveTo( 10, 50);
    scene.addChild(label);
    game.pushScene(scene);
    // 文字を消すには以下を使用
    //scene.removeChild(label);


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
    sprite.addEventListener('touchstart', function() {
      var len = scene.childNodes.length;
      console.log(scene);
      for(var i = 0; i < len; i++){
        if(scene.childNodes[i]){
          if(scene.childNodes[i]._text) // 何かテキストがセットされているならば
            scene.removeChild(scene.childNodes[i]);
        }
      }

      var label = []; // 物語表示のため、配列を用意する。
      while(true){
        var work = noveltext[0];
        noveltext.splice(0, 1); // noveltext０番目から１つ削除
        if (!(work)) break;  // 配列noveltextにはfalseがある。
        label.push(new Label(work)); // falseじゃないなら一度に表示する分追加
      }

      // 表示の処理
      for(var i = 0; i < label.length; i++){
        label[i].moveTo( 10, 80 + i * 20);
        scene.addChild(label[i]);
        game.pushScene(scene);
      }

        // 文字を消すには以下を使用
        //scene.removeChild(label);

    });
  }
  game.start();
  window.scrollTo(0, 0);
}
