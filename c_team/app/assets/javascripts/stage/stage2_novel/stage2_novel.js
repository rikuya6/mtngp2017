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
    for (let i = 1; i <= 13; i++) {
      cimg[i] = new Sprite(595, 842);
      cimg[i].image = this.game.assets["novel/" + i + ".png"];
      if (i == 1 || i == 5 || i == 9 || i == 13) {
        cimg[i].moveTo(100, -100);
      } else {
        cimg[i].moveTo(400, -100);
      }
    }
    return cimg;
  };

  let noveltext = [
    '<br><br>',
    'ところが大変！',
    'バスの運転手さんが　道を間違えているみたいです。',
    'このままだと　あずきは病院に　行けないかも　しれません。',
    false,
    '<br><br>',
    '＜ステージ２の説明＞',
    'あずきが　病院に向かえるように　ルートを考えてあげましょう！',
    101,
    false,
    false,
  ];

  new Novel(noveltext, getCimg, "stage2");
}
