// JavaScript Document

// console.log(window.innerWidth);

$(function() {
  //ページ内スクロール
  $(".nav-button").click(function () {
      var i = $(".nav-button").index(this)
      var p = $(".content-head").eq(i).offset().top - 60;
      $('html,body').animate({ scrollTop: p }, 500, 'swing');
      return false;
  });
});
