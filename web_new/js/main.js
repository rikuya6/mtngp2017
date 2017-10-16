// JavaScript Document

// console.log(window.innerWidth);

$(function() {
  //ページ内スクロール
  $(".nav-bt").click(function () {
    let i = $(".nav-bt").index(this);
    let p = (i==0)? 0 : $("h2").eq(i-1).offset().top - 60;
    $('html,body').animate({ scrollTop: p }, 800, 'swing');
      if($(window).width() <= 425){
        $('.nav-bt').slideToggle();
      }
    return false;
  });

  $(".title").click(function () {
    if($(window).width() <= 425){
      // console.log("width <= 425px");
      $('.nav-bt').slideToggle();
    }else{
      $('html,body').animate({ scrollTop: 0 }, 800, 'swing');
    }
  });

  $(".triangle").click(function () {
    var i = $(".triangle").index(this);
    var p = [$(document).height(), 0];
    $('html,body').animate({ scrollTop: p[i] }, 800, 'swing');
    return false;
  });

  $(window).resize(function () {
    $(".nav-bt").removeAttr("style");
  });
});
