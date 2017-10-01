// JavaScript Document

// console.log(window.innerWidth);

$(function() {
  //ページ内スクロール
  $(".nav-button").click(function () {
      var i = $(".nav-button").index(this);
      var p = $(".content-head").eq(i).offset().top - 50;
      if(i == 0) p = 0;
      $('html,body').animate({ scrollTop: p }, 500, 'swing');
      return false;
  });
});
