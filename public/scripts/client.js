// Client-side JS logic goes here

$(document).ready(function() {

  const renderTweets = function(tweets) {
  // loops through tweets
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweet-container').prepend($tweet);
    }
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  };
  
  const createTweetElement = function(tweet) {
    
    let now = timeago.format(tweet.created_at);
    //this changes any input in the form into text , fixes XSS issue
  
    let safeText = $('<div>').text(tweet.content.text).html();
  
    let finalHTML = `<article>
<header class="user">
  <span> <img class="avatar" src="/images/descartes.png"> &nbsp ${tweet.user.name} </span>
  <div id="username">${tweet.user.handle}</div>
</header>
<p id="full-tweet">${safeText}</p>
<footer class="publish-info">
  <div>${now}</div>
  <div class="icons">
    <i class="fa-solid fa-flag" id="flag"></i>
    <i class="fa-solid fa-retweet" id="rt"></i>
    <i class="fa-solid fa-heart" id="heart"></i>
  </div>
</footer>
</article>`;

    return finalHTML;
  };

  // //initial state - error messages hidden
  $("#error-no-input").hide();
  $("#error-chars").hide();

  $("#form-tweet").submit(function(event) {
    event.preventDefault();

      //initial state - error messages hidden
      $("#error-no-input").hide();
      $("#error-chars").hide();

    const $textarea = $(this).find('textarea');
    const textLength = $textarea.val().trim().length;

    if (textLength === 0) {
      $("#error-no-input").slideDown("slow");
    } else if (textLength > 140) {
      $("#error-chars").slideDown("slow");
    } else {
      let data = $(this).serialize();
      //once post has been completed - reload page
      $.ajax({url: "/tweets/", method: 'POST', data: data})
      .done(function() {
        loadTweets();
        $("#tweet-text").val(""); // empty the text area
        $("#counter").val(140); // reset counter value to 140
      })
      .fail(function(error) {
        //handling error here by displaying it on the console
        console.log("An error occurred: " + error);
      });
    }
  });

  // load tweets which have been posted
  const loadTweets = function() {
    $.ajax({url: "/tweets/", method: 'GET', datatype: 'json'})
      .then(function(data) {
        console.log('Success: ', data);
        //empty so the page can load all new tweets
        $('#tweet-container').empty();
        renderTweets(data);
      });
  };

  $("#arrow-down").click(function() {
    $("html").animate(
      {
        scrollTop: $(".container").offset().top
      },
      800 //speed
    );
  });

  loadTweets();

});
