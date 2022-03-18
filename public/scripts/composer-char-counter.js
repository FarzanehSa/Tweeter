// This file will be solely responsible for this character counter.

$(document).ready(function() {
  console.log('🟢 Ready to get a new Tweet!')

  // get length of value in textarea after user input anything
  $('#tweet-text').on('input', function(e) {
    const maxLen = 140;
    const inputLen = $(this).val().length;
    const remainLen = maxLen - inputLen;
    // travel domTree to find counter and update it!
    const counter = $(this).parent().find("output.counter");
    console.log(counter);
    $(counter).text(remainLen);
    // make or remove out-of-range class base on remaining length
    if (remainLen < 0) {
      $(counter).addClass('out-of-range')
    } else {
      $(counter).removeClass('out-of-range')
    }
  });
});