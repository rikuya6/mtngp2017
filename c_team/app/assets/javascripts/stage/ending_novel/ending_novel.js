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

  let noveltext = [];
  let text = [
    'あずき',
    '「よし、このルートで向かおう！」', //ああああああ
    13,
    104,
    false,
    -13,
  ];

  let zundatext = [
    '<br><br>',
    '　・',
    '　・',
    '　・',
    '　・',
    110,
    -13,
    false,
    '<br><br>',
    'あずきが病院に向かって歩いていると、和菓子屋さんを見つけました。',
    1,
    111,
    false,
    'あずき',
    '「ずんだ堂だ！　おばあちゃん、苺大福が好きだったよね…',
    '　やっぱり　お花以外にも　持って行ってあげよう！」',
    false,
    '<br><br>',
    'そういうとあずきは和菓子屋さんに入って行きました。',
    false,
    '<br><br>',
    '　・',
    '　・',
    '　・',
    '　・',
    110,
    -1,
    false,
    'あずき',
    '「おばあちゃんの好きな苺大福も買えたし、先に進もう」',
    1,
    111,
    false,
    '<br><br>',
    'あずきは　花束と苺大福の入った袋を片手に　病院の方に向かって',
    '歩き出しました。',
    false,
    '<br><br>',
    '　・',
    '　・',
    '　・',
    '　・',
    110,
    -1,
    false,
  ];
  let supertext = [
    '<br><br>',
    'あずきが　病院に向かって　歩いていると、',
    '大きなスーパーを　見つけました。',
    1,
    112,
    false,
    'あずき',
    '「スーパーだ！',
    '　ここなら　お見舞いに持っていける　果物も売ってるよね！」',
    -1,
    13,
    false,
    '<br><br>',
    'あずきは　大きなスーパーに向かって　行きました。',
    'その途中でのことです。',
    false,
    'あずき',
    '「あれ？　りんごが　こんなところに落ちてる…　ここにも…',
    '　どうしたんだろう？」',
    -13,
    9,
    false,
    '<br><br>',
    '歩いていると　ちらほらと果物が　落ちていることに',
    'あずきは気付きます。',
    false,
    'あずき',
    '「とりあえず　拾っておこうかな」',
    false,
    '<br><br>',
    'そういって　果物を　拾っていた時です。',
    false,
    '？？',
    '「あ、ごめんね！　そのりんご　私のなの！」',
    8,
    false,
    '<br><br>',
    '果物を　拾っているあずきに　声をかけてくる人が　いました。',
    false,
    'あずき',
    '「そうなんですね、この辺に落ちてた果物は　これだけです」',
    -9,
    1,
    false,
    '？？',
    '「まあ、ありがとう！　拾って集めてくれたのね」',
    false,
    'あずき',
    '「どういたしまして！」',
    -1,
    13,
    false,
    '<br><br>',
    'あずきが　拾った果物を渡して　スーパーの方に向かおうと',
    'するとその人から　呼び止められました。',
    -13,
    1,
    false,
    '？？',
    '「ちょっと待って！　もしよかったら　拾ってくれたお礼に',
    '　果物をもらってくれない？」',
    false,
    'あずき',
    '「え、いいんですか？」',
    false,
    '？？',
    '「いいのよ！　花束とか持ってるし　お見舞いに行くんでしょう？',
    '　こっちは落ちてない果物だから、安心してね」',
    false,
    'あずき',
    '「ありがとうございます！」',
    -1,
    -8,
    13,
    false,
    '<br><br>',
    'あずきは　もらった果物を大事に持って　病院まで向かいました。',
    false,
    '<br><br>',
    '　・',
    '　・',
    '　・',
    '　・',
    110,
    -13,
    false,
  ];
  let hosptext = [
    'あずき',
    '「ここが　おばあちゃんのいる病院か…',
    '　たしか病室は　207号室だったよね　早く行こうっと！」',
    1,
    108,
    false,
    '<br><br>',
    'あずきは　急ぎ足で　おばあちゃんのいる病室に　向かいました。',
    false,
    '<br><br>',
    '　・',
    '　・',
    '　・',
    '　・',
    110,
    -1,
    false,
    'あずき',
    '「おばあちゃん　いる…？」',
    9,
    109,
    false,
  ];

  let grandmom = [
    'おばあちゃん',
    '「あら　あずき！　よくここに来れたわね！',
    '　さあ　こっちにおいで」',
    6,
    false,
    'あずき',
    '「うん！」',
    -9,
    13,
    false,
    '<br><br>',
    'あずきは　久々に会ったおばあちゃんの元に駆け寄りました。',
    false,
    'あずき',
    '「おばあちゃん　私、ここまで一人で来たの！　すごいでしょ？」',
    false,
    'おばあちゃん',
    '「あら、一人で来たの？　遠いのによく来れたわねぇ',
    '　あら　そっちに持ってるものはなあに？」',
    false,
    '<br><br>',
    'あずきはそう聞かれて　病院に来るまでに用意したものを',
    'おばあちゃんに手渡しました。',
    false,
  ];

  let flower = [
    'あずき',
    '「はい！　おばあちゃんが好きかなって思って、花束にしたの！',
  ];
  let snack = [
    '　あと、お団子も好きだよね！',
  ];
  let apple = [
    '　この果物は　お手伝いしたから　お礼にもらったんだよ！」',
  ];
  let nonflower = [
    'あずき',
    '「お花は持ってこれなかったけど　おばあちゃんの好きな',
    '　お団子と　果物持ってきたよ！」',
  ];

  let grandmom2 = [
    -13,
    1,
    false,
    '<br><br>',
    'あずきの話を　おばあちゃんは嬉しそうに　聞いています。',
    false,
    'おばあちゃん',
    '「そう、一人でおばあちゃんのために　いっぱい考えてきてくれたのね',
    '　おばあちゃん　とっても嬉しいわ。',
    '　ありがとう　あずきちゃん」',
    false,
    'あずき',
    '「私も　おばあちゃんに喜んでもらえて　嬉しい！',
    '　ずっと寂しかったんだよ　まだお家帰ってこれないの？」',
    -1,
    9,
    false,
  ];

  let good = [
    '<br><br>',
    'そうあずきが聞くと　おばあちゃんは嬉しそうに笑って　言いました。',
    false,
    'おばあちゃん',
    '「それがね、　大したことなかったから　もう退院できるのよ！',
    '　今　退院の準備を　しているところなのよ」',
    false,
    'あずき',
    '「本当に？　一緒に帰れるの…？」',
    -9,
    13,
    false,
    '<br><br>',
    'あずきは　それを聞いて　とても嬉しくなりました。',
    false,
    'あずき',
    '「じゃあ　私も一緒に　お手伝いする！',
    '　早く帰ろう！」',
    false,
    'おばあちゃん',
    '「そうね　それじゃあ一緒に帰りましょうか」',
    false,
    '<br><br>',
    'あずきは　おばあちゃんと一緒に　おうちに帰ることができました。',
    false,
    '<br><br>',
    '　・',
    '　・',
    '　・',
    '　・',
    110,
    -13,
    -6,
    false,
    '<br><br>',
    'おばあちゃんと帰って来たあずきは　お見舞いで買って来た',
    'お菓子を食べながら　今日のことを話しました。',
    1,
    6,
    103,
    false,
    'あずき',
    '「それでね！　お花屋さんに行って、和菓子屋さんにも行ったの！」',
    -1,
    13,
    false,
    'おばあちゃん',
    '「そうなのね　色々おばあちゃんのことを考えて　来てくれたのね。',
    '　ありがとう　あずきちゃん',
    '　おばあちゃん　嬉しいわ」',
    false,
    'あずき',
    '「あずきも　おばあちゃんが　帰って来てくれて　嬉しい！',
    '　おばあちゃん　大好き！」',
    false,
    '<br><br>',
    'めでたしめでたし',
    false,
  ];
  let nomal = [
    '<br><br>',
    'そうあずきが聞くと　おばあちゃんは少し困ったように',
    '笑って言いました。',
    false,
    'おばあちゃん',
    '「そうね… すぐにはおうちに帰れないみたい」',
    false,
    'おばあちゃん',
    '「でもね　心配しないで',
    '　ちゃんと良くなるって　お医者さん言ってたから」',
    false,
    'あずき',
    '「ほんとう…？」',
    -9,
    13,
    false,
    'おばあちゃん',
    '「おばあちゃんは　あずきに嘘なんて　言わないわ',
    '　また今度　あずきが来れる時に　また来てくれると嬉しいわ」',
    -13,
    1,
    false,
    'あずき',
    '「もちろん！　すぐにまた来るよ',
    '　その時は　今日よりいろんなもの持ってくるね！」',
    -1,
    5,
    false,
    '<br><br>',
    'あずきは　またおばあちゃんに　会いに行こうと決心しました。',
    false,
    'あずき',
    '「おばあちゃん　また来るね！」',
    -5,
    1,
    false,
    '<br><br>',
    '　・',
    '　・',
    '　・',
    '　・',
    110,
    -1,
    -6,
    false,
  ];
  let bad = [
    '<br><br>',
    'あずきは　おばあちゃんのいる病室に　向かうことができました。',
    'ところが　あずきが声をかけても　返事がないようです。',
    false,
    'あずき',
    '「おばあちゃん…？',
    '　なんで　返事してくれないの…？',
    false,
    'おばあちゃん',
    '「………」',
    false,
    'あずき',
    '「おばあちゃん…',
    '　なんで何も言ってくれないの…？」',
    -9,
    5,
    false,
    'あずき',
    '「私が　悪いのかな',
    '　お母さんが　お花を持って行きなさい　とか　寄り道はダメだよ',
    '　とか言ってたの　守らなかったから…？」',
    false,
    '<br><br>',
    'あずきは　だんだんと　悲しい気持ちになってきました。',
    'あずきが話しかけた時は　いつも返事をしてくれるのに',
    '今日のおばあちゃんは　何も話してくれません。',
    false,
    'あずき',
    '「やだよ…こんなの嫌だ！！」',
    false,
    '<br><br>',
    '　・',
    '　・',
    '　・',
    '　・',
    -5,
    110,
    false,
    'あずき',
    '「………あれ…？　今のは何だったの…？',
    '　なんかすごく　嫌な夢を見ていた気がする……',
    '　おばあちゃんが　いなくなっちゃうような…？」',
    9,
    103,
    false,
    '<br><br>',
    'あずきは　ついさっきの事を思い出そうとしますが',
    'なかなか思い出すことができません。',
    false,
    'あずき',
    '「何だったんだろう…？',
    '　でもとにかく　お母さんの言うことは',
    '　しっかり守らないといけないような気がする…」',
    false,
    '<br><br>',
    'あずきがそうやって考え込んでいた時のことです。',
    false,
    'お母さん',
    '「あずき！　聞いて！',
    '　おばあちゃんがね　入院することになっちゃったの！」',
    3,
    false,
    'あずき',
    '「え…？　それって　もしかして　ゆめのなかで…！」',
    false,
  ];

  let end = [
    false,
  ];

  // Cookieフラグ管理
  let status = Cookies.getJSON('status');
  console.log(status);

  if (!(status.library_flg) && (status.zunda || status.supermarket || status.flower_flg)) {
    Array.prototype.push.apply(noveltext, text);
    if (status.zunda) Array.prototype.push.apply(noveltext, zundatext);
    if (status.supermarket) Array.prototype.push.apply(noveltext, supertext);
    Array.prototype.push.apply(noveltext, hosptext);
    Array.prototype.push.apply(noveltext, grandmom);

    if (status.flower_flg) Array.prototype.push.apply(noveltext, flower);

    if ((status.zunda || status.supermarket) && !(status.flower_flg)) {
      Array.prototype.push.apply(noveltext, nonflower);
      Array.prototype.push.apply(noveltext, grandmom2);
      Array.prototype.push.apply(noveltext, nomal);
    } else if (status.zunda && status.supermarket && status.flower_flg) {
      Array.prototype.push.apply(noveltext, snack);
      Array.prototype.push.apply(noveltext, apple);
      Array.prototype.push.apply(noveltext, grandmom2);
      Array.prototype.push.apply(noveltext, good);
    } else if (status.zunda && !(status.supermarket)) {
      Array.prototype.push.apply(noveltext, snack);
      Array.prototype.push.apply(noveltext, grandmom2);
      Array.prototype.push.apply(noveltext, nomal);
    } else if (status.supermarket && !(status.zunda)) {
      Array.prototype.push.apply(noveltext, apple);
      Array.prototype.push.apply(noveltext, grandmom2);
      Array.prototype.push.apply(noveltext, nomal);
    } else {
      Array.prototype.push.apply(noveltext, grandmom2);
      Array.prototype.push.apply(noveltext, nomal);
    }
  } else {
    Array.prototype.push.apply(noveltext, hosptext);
    Array.prototype.push.apply(noveltext, bad);
  }
  Array.prototype.push.apply(noveltext, end);

  new Novel(noveltext, getCimg, "staff");
}
