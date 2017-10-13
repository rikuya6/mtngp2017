// JavaScript Document

// console.log(window.innerWidth);

$(function() {
  //ページ内スクロール
  $("header a").click(function () {
    let i = $("header a").index(this);
    if(i < 5){
      let p = (i==0)? 0 : $("h2").eq(i-1).offset().top - 60;
      $('html,body').animate({ scrollTop: p }, 800, 'swing');
    }else{
      $(".acc-nav").slideToggle();
    }
    return false;
  });

  $(".triangle").click(function () {
    var i = $(".triangle").index(this);
    var p = [$(document).height(), 0];
    $('html,body').animate({ scrollTop: p[i] }, 800, 'swing');
    return false;
  });

  $(window).resize(function () {
    $(".acc-nav").removeAttr("style");
  });
});
