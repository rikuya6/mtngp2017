// 「ヘルプ」の表示
function help_button () {
  let helpTextBefore = document.getElementById("help_text_before");
  if (helpTextBefore == null) return;
  helpTextBefore.parentNode.removeChild(helpTextBefore);
  let helpTextAfter = document.getElementById("help_text_after");
  helpTextAfter.removeAttribute("style");
}
