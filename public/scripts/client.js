// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

// takes in an array of tweet objects
// appending each one to the #tweets-container.
const renderTweets = function(tweets) {
  const $tweetsContainer = $("#tweets-container")
  tweets.forEach(tweet => {
    const $tweet = createTweetElement(tweet);
    $tweetsContainer.append($tweet);
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
    <snap>${tweetData.created_at}</snap>
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

// Run the code!
$(()=> {
  console.log("🟢 Ready - Fetch old tweets")
  renderTweets(data);
});