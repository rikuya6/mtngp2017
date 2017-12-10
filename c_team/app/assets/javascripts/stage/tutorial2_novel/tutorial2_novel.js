$(document).ready(function() {
  enchant();
  main();
});

var screen_width = 1152; //ゲーム画面の幅
var screen_height = 640; //ゲーム画面の高さ
var tex_width = screen_width - 80; //ノベルテキストエリアの幅
var tex_heigth = 200; //ノベルテキストエリアの高さ

function main(){
  let getCimg = function () {
    // キャラクター画像の準備
    let cimg = [];
    cimg[0] = false;
    for(let i = 1; i <= 13; i++){
      cimg[i] = new Sprite(595, 842);
      cimg[i].image = this.game.assets["novel/"+i+".png"];
      cimg[i].moveTo((screen_width / 4) - 50, -100);
    }
    return cimg;
  };

  let noveltext = [
    102,
    'えほんかき',
    '「よく出来たね。',
    '　これが登場人物を　動かすってことなんだ。」',
    2,
    false,
    'えほんかき',
    '「じゃあ次の子も　ちょうせんしてみようか。」',
    false,
    'えほんかき',
    '「次の子は　まいごになっているから　ゴールに着くように',
    '　助けてあげよう。」',
    false,
    'えほんかき',
    '「次は、『もし前へ進めないなら　右へ曲がる』っていう',
    '　プログラムが　せっていされているよ。」',
    114,
    false,
    'えほんかき',
    '「赤いパイロンを置いて　ゴール着くようにしよう。」',
    false,
    '<br><br>',
    '<チュートリアル2>',
    'もし　前に進めないなら右に曲がる子を　ゴールにとどよう',
    false,
    false
  ];

  new Novel(noveltext, getCimg, "tutorial2");
}
