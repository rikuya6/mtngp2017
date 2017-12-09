$(document).ready(function() {
  enchant();
  main();
});

var screen_width = 1152; //ゲーム画面の幅
var screen_height = 640; //ゲーム画面の高さ
var tex_width = screen_width - 80; //ノベルテキストエリアの幅
var tex_heigth = 100; //ノベルテキストエリアの高さ

function main() {
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
    '「やぁ。君がぼくの本を　手伝ってくれるって子かい？',
    2,
    false,
    'えほんかき',
    '「ぼくはここで　ずっと絵本を　書いているんだ。」',
    false,
    'えほんかき',
    '「これから君には　ぼくの絵本の登場人物を　動かすのを',
    '　手伝ってもらうよ。」',
    false,
    'えほんかき',
    '「まずは聞くよりやってみよう。この子を動かしてみてみよう。」',
    false,
    113,
    '<br><br>',
    '<チュートリアル1  実行しよう>',
    '『前に進む』という　プログラムが　せっていされているよ。',
    '実行を押して　ゴールに行かせてあげよう。',
    false,
    'えほんかき',
    '「登場人物は左の『〜動き方〜』の通りに動くよ。',
    '　実行ボタンをおして、動かしてみよう。」',
    false,
    false
  ];

  new Novel(noveltext, getCimg, "tutorial1_novel");
}
