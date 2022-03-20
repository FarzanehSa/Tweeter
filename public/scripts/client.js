// takes in an array of tweet objects
// appending each one to the #tweets-container.
const renderTweets = function(tweets) {
  const $tweetsContainer = $("#tweets-container")
  tweets.forEach(tweet => {
    const $tweet = createTweetElement(tweet);
    $tweetsContainer.prepend($tweet);
  });
};

// takes in a tweet object 
// returns a tweet <article> element containing the entire HTML structure of the tweet
const createTweetElement = function(tweetData) {
  const $tweet = $(`
  <article class="tweet">
  <header>
    <div class=img-name>
      <img src="${tweetData.user.avatars}">
      <snap>${tweetData.user.name}</snap>
    </div>
    <snap>${tweetData.user.handle}</snap>
  </header>
  <p class="tweet-body">${tweetData.content.text}</p>
  <footer>
    <snap>${timeago.format(tweetData.created_at)}</snap>
    <span>
      <i class="fa-solid fa-flag icon"></i>
      <i class="fa-solid fa-retweet icon"></i>
      <i class="fa-solid fa-heart icon"></i>
    </span>
  </footer>
</article>
  `);
  return $tweet;
};

// Document loaded!
$(()=> {
  
  console.log("🟢 Ready - Fetch old tweets")

  // 🚨🚨 check if empty text
  $(document).submit(function(event) {
    console.log('🟠 Prevent Old Fashion Submit');
    event.preventDefault();
    const inputEncoded = $.param($('#tweet-text'));
    $.post("/tweets",inputEncoded, function() {
      console.log("🟢 Post Data Successfully!")
      loadTweets();
    })
    .fail(function() {
      alert( "🛑🛑🛑 \n Error Occured @ Sending New Tweet" );
    })
    $('#tweet-text').val('').focus();
  });

  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
    .then(function (tweetsData) {
      renderTweets(tweetsData);
    });
  }

  loadTweets();

});
