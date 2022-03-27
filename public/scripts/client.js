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
      <snap id="userHandle">${tweetData.user.handle}</snap>
    </header>
  `);

  // Prevent Cross-Site Scripting by using .text();
  // recognize new line and show that in tweet page.
  const arr = tweetData.content.text.trim().split('\n')
  const $p = $('<p>').addClass("tweet-body").text(arr[0]);
  for (let i = 1; i < arr.length; i++) {
    $p.append($('<br />'))
    $p.append($('<snap>').text(arr[i]))
  }

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

// run on click event / scrollTop button
const goToTop = function() {
  $(document.documentElement).scrollTop(0);
  $('#new-tweet-form').slideDown();
  $('#tweet-text').focus();
};

// control scrollTop button appear / disappear
const showScrollBotton = function() {
  if ($(document.documentElement.scrollTop)[0] > 80) {
    $("#scrollTop").css("display","block");
    $(".writeTweet").css("visibility","hidden");
  } else {
    $("#scrollTop").css("display","none");
    $(".writeTweet").css("visibility","visible");
  }
};

// Document loaded!
$(()=> {
  
  console.log("🟢 Document Ready");

  // event handler (click) for "write new tweet"
  $('nav').find('button').on('click',() => {
    if ($('#new-tweet-form').first().is(":hidden")) {
      $('#new-tweet-form').slideDown();
      $('#tweet-text').focus();
    } else {
      $('#new-tweet-form').hide();
    }
  });

  // submit new tweet - ajax
  $('#new-tweet-form').submit(function(event) {
    event.preventDefault(); // Prevent Old Fashion Submit
    $(this).find('.errorMsg').text('').hide(); // hide error msg from before this moment!
    
    // check if input is empty or too long!
    const inputLen = $(this).children('#tweet-text').val().trim().length;
    if (inputLen === 0) {
      $(this).find('.errorMsg').text('* Content Is Not Present!').slideDown();
      $(this).find("button").blur();
      return;
    }
    if (inputLen > 140) {
      $(this).find('.errorMsg').text('* Content Is Too Long!').slideDown();
      $(this).find("button").blur();
      return;
    }
    
    let data = $(this).serialize();
    // disable submit button temprory
    $(this).find("button").prop('disabled',true);

    $.ajax({
      url: "/tweets",
      method: "post",
      data: data
    }).then(() => {
      console.log("🟢 Post Data Successfully!");
      // in this success part. call loadTweets
      // then erase tweet-text, put cursor And trigger input event to couter shows correct number
      // enable submit button
      loadTweets();
      $('#tweet-text').val('').focus().trigger('input');
      $(this).find("button").prop('disabled',false);
    })
    // in error situation, just enable button
      .catch(() => {
        alert("🛑🛑🛑 \n Error Occured @ Sending New Tweet");
        $(this).find("button").prop('disabled',false);
      });
  });

  // get all saved tweets and send them as param to renderTweets() 
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET'
    }).then(function(tweetsData) {
      renderTweets(tweetsData);
    });
  };

  // call function to show tweets!
  loadTweets();

  // on event of scroll call showTop
  $(window).scroll(() => {
    showScrollBotton();
  });
});