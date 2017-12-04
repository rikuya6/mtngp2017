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
      1001,
      '2017　松永プロジェクト',
      'あずきのおみまい',
      '<br>',
      '企画・制作',
      '　C班一同',
      1001,
      'おしまい',
      false,
      false,
    ];

    // 文字表示するための処理
    // labelという配列にどんどん追加していく
    while(true){
      let work = noveltext[0];
      noveltext.splice(0, 1); // noveltext０番目から１つ削除
      if (!(work)) break;  // 配列noveltextにはfalseがある。

      // 以下、キャラクター表示の指示が来た場合の処理
      if (!(isNaN(work))) {
        console.log("work:" + work);
        if (work > 1000) { // 1000以上は文字色管理
          label.push(work);
        }else if (work > 100) {
          sprite.image = game.assets['novel/' + work + '.jpg'];
          //break;
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
        label[i].font = "72px 'メイリオ'";
      }else{
        label[i].color = "white"; // 通常色
        label[i].font = "32px 'メイリオ'";
      }
      label[i].moveTo( 40, 650 + index * 40);
      // label[i].color = "white";
      // if(i % 2 == 0)   label[i].color = "red";
      scene.addChild(label[i]);
      label[i].tl.fadeIn(70 * i).moveTo(40, -500, 450); // スクロール
      index++;
    }

  };
  game.start();
  window.scrollTo(0, 0);
}
