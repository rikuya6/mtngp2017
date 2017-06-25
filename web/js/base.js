window.onload = load();

function load() {
  //var bT = document.getElementById("blue");
  //var oH = document.getElementById("orange");
  var width = window.innerWidth;
  var height = window.innerHeight;
  console.log(height);
  //var x = width/10;
  //var y = height - x;
  //bT.style.top = x + "px";
  //bT.style.height = y +"px";
  //oH.style.height =  y+ "px";
  //console.log(x);
  //console.log(oH);
  //console.log(bT);

  var titleLeft = document.getElementById("top").style.left;
  titleLeft = (width - 500) / 2 + "px";


  var h01 = document.getElementById("hasira01");
  var h02 = document.getElementById("hasira02");
  var h03 = document.getElementById("hasira03");
  var h04 = document.getElementById("hasira04");
  var h05 = document.getElementById("hasira05");


  h01.style.height = height + "px";
  console.log(h01.style.height);
  h02.style.height = height + "px";
  h03.style.height = height + "px";
  h04.style.height = height + "px";
  h05.style.height = height + "px";

  return;
}
