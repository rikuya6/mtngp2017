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
    'あるところに　あずきという　女の子がいました。',
    'あずきのお父さんとお母さんは　お仕事があるので',
    '学校から帰ってくると　家にはいつもおばあちゃんがいました。',
    false,
    '<br><br>',
    'ところがある日、　おばあちゃんは',
    '入院することになって　しまいました。',
    '<br><br>',
    'おばあちゃんが　入院してから　数日後のことです。',
    false,
    'あずき',
    '「やっぱり　おばあちゃんに　会えないのはさびしい…',
    '　そうだ、　おばあちゃんに　会いに行けばいいんだ！」',
    103,
    5,
    3,
    false,
    '<br><br>',
    'そう思い立ったところで　あずきは　病院への行き方を　知りません。',
    'そこで　お母さんに　相談することに　しました。',
    false,
    'あずき',
    '「ねえお母さん、　わたし、　おばあちゃんに　会えなくてさびしい…',
    '　おばあちゃんに　会いに行けないの？」',
    false,
    'お母さん',
    '「そうね…　さびしいのも　わかるけれど、',
    '　お母さんたち　今日は　お仕事があるから',
    '　いっしょに行くことが　できないの」',
    false,
    'あずき',
    '「わたし　ひとりでも　行く！　病院には　どうやって行くの？」',
    -5,
    1,
    false,
    'お母さん',
    '「病院へは　バスを使って　行くのよ',
    '　家のそばの　バス停から　『総合病院行き』　に乗って',
    '　５こ目で　バス停を　おりるの」',
    false,
    'お母さん',
    '「そこから　１０分くらいのところに',
    '　おばあちゃんのいる　病院があるわ',
    '　おばあちゃんの病室は　207号室なんだけど…」',
    false,
    'お母さん',
    '「一回で　覚えられるわけ　ないわね',
    '　メモを書いてあげるから　待ってなさい」',
    false,
    '<br><br>',
    'あずきは　お母さんから　病院までの',
    '行き方が書いてある　メモをもらいました。',
    false,
    'あずき',
    '「ありがとう」',
    false,
    'お母さん',
    '「もしあずきに　よゆうがあるなら　行く途中にある',
    1001,
    '　お花屋さんで　お花を買っていったら',
    '　おばあちゃん喜ぶと思うよ」',
    false,
    'あずき',
    '「うん　わかった」',
    false,
    '<br><br>',
    'あずきは　おばあちゃんの病院に　向かうべく、',
    'まずは　バス停に向かって　歩くことに　決めました。',
    -3,
    false,
    'あずき',
    '「歩き始める前に、　どこを通っていくか　決めておきたいな」',
    false,
    'あずき',
    '「せっかくだから　お母さんが　書いてくれたメモを　使おう！」',
    false,
    'あずき',
    '「お母さんの言うとおり、　お花屋さんによって　花束買いたいよね…」',
    false,
    -1,
    101,
    '<br><br>',
    '＜ステージの説明＞',
    'このままでも　バス停に行くことができるけど',
    'バス停に向かうまでに　花屋さんによってお花を買おう',
    'より道はしないようにね！',
    false,
    false
  ];

  new Novel(noveltext, getCimg, "stage1");
}
