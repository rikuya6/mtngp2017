// JavaScript Document

// console.log(window.innerWidth);

$(function() {
  //ページ内スクロール
  $(".nav-button").click(function () {
    var i = $(".nav-button").index(this);
    var p = $(".content-head").eq(i).offset().top - 50;
    if(i == 0) p = 0;
    $('html,body').animate({ scrollTop: p }, 800, 'swing');
    return false;
  });

  $(".nav-triangle").click(function () {
    var i = $(".nav-triangle").index(this);
    var p = [$(document).height(), 0];
    $('html,body').animate({ scrollTop: p[i] }, 800, 'swing');
    return false;
  });
});
