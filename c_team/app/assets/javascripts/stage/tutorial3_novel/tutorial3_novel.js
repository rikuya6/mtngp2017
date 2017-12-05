$(document).ready(function() {
  enchant();
  main();
});

var screen_width = 1152; //ゲーム画面の幅
var screen_height = 640; //ゲーム画面の高さ
var tex_width = screen_width - 80; //ノベルテキストエリアの幅
var tex_heigth = 200; //ノベルテキストエリアの高さ

function main(){
  let noveltext = [
    102,
    '絵本描き',
    '「よく出来たね。',
    '　登場人物には、『もし○○ならxxしよう』',
    '　って決めている　子がいるよ。」',
    2,
    false,
    '絵本描き',
    '「その子の　気持ちを変えずに',
    '　道を　変えてあげるのが　大事だよ。」',
    false,
    '絵本描き',
    '「さて、最後の練習だ。この子は　くりかえしの迷路に入って',
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
  new Novel(noveltext, "tutorial3");
}
