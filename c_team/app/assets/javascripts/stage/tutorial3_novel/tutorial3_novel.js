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
    '　登場人物には、『もし○○ならxxしよう』',
    '　ってプログラムが　決められているよ。」',
    2,
    false,
    'えほんかき',
    '「その子の　気持ちを変えずに',
    '　道を　変えてあげるのが　大事だよ。」',
    false,
    'えほんかき',
    '「さて、最後の練習だ。この子は　くりかえしの　めいろに入って',
    '　しまったみたいだ。ゴールに　たどり着くには　どうすれば',
    '　良いかな？」',
    115,
    false,
    '<br><br>',
    '<チュートリアル3>',
    '『前に進めないと右に曲がる』をずっと　くりかえしている子がいるよ',
    'ゴールに着くにはどうすれば良いかな？',
    false,
    false
  ];

  new Novel(noveltext, getCimg, "tutorial3");
}
