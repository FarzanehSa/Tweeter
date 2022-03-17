// This file will be solely responsible for this character counter.

$(document).ready(function() {
  console.log('🟢 Document is loaded')
  $('#tweet-text').on('input', function(e) {
    const maxLen = 140;
    const inputLen = $(this).val().length;
    const counter = $(this).parent().find("output.counter");
    counter[0].innerText = maxLen - inputLen;
  });
});