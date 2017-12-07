$(document).ready(function() {
  enchant();
  main();
});

var screen_width = 1152; //ゲーム画面の幅
var screen_height = 640; //ゲーム画面の高さ
var tex_width = screen_width - 80; //ノベルテキストエリアの幅
var tex_heigth = 200; //ノベルテキストエリアの高さ

var col = []; // 文字色
col[1001] = "orange";

function main(){
  var game = new Core(screen_width, screen_height);
  game.fps = 30;
  game.rootScene.backgroundColor = "black";

  for(let i = 1; i <= 6; i++){
    game.preload("novel/staff/" + i + ".png");
  }
  for(let i = 119; i <= 121; i++){
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
    for(let i = 1; i <= 6; i++){
      cimg[i] = new Sprite(595, 842);
      cimg[i].image = game.assets["novel/staff/"+i+".png"];
      console.log(cimg[i].image);
      cimg[i].moveTo(-70, -120);
    }
    for(let i = 119; i <= 121; i++){
      cimg[i] = new Sprite(screen_width, screen_height);
      cimg[i].image = game.assets["novel/" + i + ".png"];
      cimg[i].moveTo(0, 0);
    }

    var label = []; // 物語表示のため、配列を用意する。
    var noveltext = [
      1001,
      '2017　松永プロジェクト',
      'あずきのおみまい',
      '<br><br><br>',
      'あずき',
      '<br><br>',
      'えほんかきのおじさん',
      '<br><br>',
      'おかあさん',
      '<br><br>',
      'きなこ',
      '<br><br>',
      'おばあちゃん',
      '<br><br>',
      'スーパーのおばちゃん',
      '<br><br>',
      '企画・制作',
      '　C班一同',
    ];

    // Cookieフラグ管理
    var status = Cookies.getJSON('status');
    // console.log(status);

    if (status.zunda || status.supermarket || status.flower_flg) {
      if (status.zunda && status.supermarket && status.flower_flg) {
        noveltext.push(119);
        noveltext.push(false);
      } else {
        noveltext.push(120);
        noveltext.push(false);
      }
    } else {
      noveltext.push(121);
      noveltext.push(false);
    }
    // console.log(noveltext);

    // 文字表示するための処理
    // labelという配列にどんどん追加していく
    while(true){
      let work = noveltext[0];
      noveltext.splice(0, 1); // noveltext０番目から１つ削除
      if (!(work)) break;  // 配列noveltextにはfalseがある。

      // 以下、キャラクター表示の指示が来た場合の処理
      if (!(isNaN(work))) {
        console.log("work:" + work);
        if (work > 100) { // 1000以上は文字色管理
          label.push(work);
        }else if (work > 0){
          scene.addChild(cimg[work]);
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
    var index = 0; // インデックス管理に必須
    for(let i = 0; i < label.length; i++){
      if (label[i] > 1000){ //文字色変更信号
        // console.log(col[label[i]]);
        continue;
      }else if (label[i - 1] > 1000){
        label[i].color = col[label[i-1]];
        label[i].font = "56px 'メイリオ'";
      }else if (label[i] > 100) {
        scene.addChild(cimg[label[i]]);
        cimg[label[i]].opacity = 0.0;
        cimg[label[i]].tl.delay(40 * i + 450).fadeIn(100);
        continue;
      }else{
        label[i].color = "white"; // 通常色
        label[i].font = "32px 'メイリオ'";
      }
      label[i].moveTo( 450, 640 + index * 40);
      // label[i].color = "white";
      // if(i % 2 == 0)   label[i].color = "red";
      scene.addChild(label[i]);
      label[i].tl.fadeIn(40 * i).moveTo(450, -1000, 850); // スクロール
      if (i < 7) {
        scene.addChild(cimg[i]);
        cimg[i].opacity = 0.0;
        cimg[i].tl.delay(140 * i)
                  .fadeIn(40)
                  .delay(70)
                  .fadeOut(40)
      }
      index++;
    }

    /* どこをクリックしてもすすめるようにするためのすぷらいとくん */
    var sprite4 = new Sprite(screen_width, screen_height);
    scene.addChild(sprite4);
    game.pushScene(scene);
    // 画面がクリックされたならば以下が呼び出される
    sprite4.addEventListener('touchstart', function() {
      let submit = document.getElementById("title");
      submit.submit();
      game.pause();
    });

  };
  game.start();
  window.scrollTo(0, 0);
}
