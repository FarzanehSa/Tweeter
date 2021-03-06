// takes in an array of tweet objects
// appending each one to the #tweets-container.
const renderTweets = function(tweets) {
  const $tweetsContainer = $("#tweets-container");
  // erase all childern of tweetsCouter
  $tweetsContainer.empty();
  // reassign them
  tweets.forEach(tweet => {
    const $tweet = createTweetElement(tweet);
    $tweetsContainer.prepend($tweet);
  });
};

// takes in a tweet object 
// returns a tweet <article> element containing the entire HTML structure of the tweet
const createTweetElement = function(tweetData) {
  
  const $header = $(`
    <header>
      <div class=img-name>
        <img src="${tweetData.user.avatars}">
        <snap>${tweetData.user.name}</snap>
      </div>
      <snap>${tweetData.user.handle}</snap>
    </header>
  `);

  // Prevent Cross-Site Scripting by using .text();
  const $p = $('<p>').addClass("tweet-body").text(tweetData.content.text);
  
  const $footer = $(`
    <footer>
      <snap>${timeago.format(tweetData.created_at)}</snap>
      <span>
        <i class="fa-solid fa-flag icon"></i>
        <i class="fa-solid fa-retweet icon"></i>
        <i class="fa-solid fa-heart icon"></i>
      </span>
    </footer>
  `);

  $tweet = $("<article>").addClass("tweet").append($header,$p,$footer);
  return $tweet;
};

const goToTop = function() {
  $(document.documentElement).scrollTop(0);
  $('#new-tweet-form').slideDown();
  $('#tweet-text').focus();
};

const showTopBotton = function() {
  if ($(document.documentElement.scrollTop)[0] > 80) {
    $("#scrollTop").css("display","block")
    $(".writeTweet").css("visibility","hidden")
  } else {
    $("#scrollTop").css("display","none")
    $(".writeTweet").css("visibility","visible")
  }
}

// Document loaded!
$(()=> {
  
  console.log("🟢 Document Ready");

  // $('#new-tweet-form').hide();

  $('nav').find('.dblAngel').on('click',() => {
    if ( $('#new-tweet-form').first().is( ":hidden" ) ) {
      $('#new-tweet-form').slideDown();
      $('#tweet-text').focus();
    } else {
      $('#new-tweet-form').hide();
    }
  });

  $('#new-tweet-form').submit(function(event) {
    console.log('🟠 Prevent Old Fashion Submit');
    event.preventDefault();
    $(this).find('.errorMsg').text('').hide()
    // check if input is empty or too long!
    const inputLen = $(this).children('#tweet-text').val().trim().length;
    if (inputLen === 0) {
      $(this).find('.errorMsg').text('* Content Is Not Present!').slideDown();
      return ;
    }
    if (inputLen > 140) {
      $(this).find('.errorMsg').text('* Content Is Too Long!').slideDown();
      return ;
    }
    
    const data = $(this).serialize();
    // disable button temprory
    $(this).find("button").prop('disabled',true);

    $.ajax({
      url: "/tweets",
      method: "post",
      data: data
    }).then(() => {
      console.log("🟢 Post Data Successfully!");
      // in this success part. call loadTweets 
      // then erase tweet-text, put cursor And trigger input event to couter shows correct number
      // enable button
      loadTweets();
      $('#tweet-text').val('').focus().trigger('input');
      $(this).find("button").prop('disabled',false);
    })
    // in error part, just enable button
    .catch (() => {
      alert( "🛑🛑🛑 \n Error Occured @ Sending New Tweet" );
      $(this).find("button").prop('disabled',false);
    })
  });

  const loadTweets = function() {
    $.ajax({
    url: '/tweets',
    method: 'GET' 
    }).then(function (tweetsData) {
      renderTweets(tweetsData);
    });
  }

  loadTweets();

  $(window).scroll(() => {
    showTopBotton();
  })

});
