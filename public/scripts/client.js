/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

$(document).ready(function() {

const renderTweets = function(tweets) {
  // loops through tweets
  for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweet-container').append($tweet);
  }
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
}

const createTweetElement = function(tweet) { 
  let now = timeago.format(tweet.created_at);
  //timestamp wasn't giving a valid date
  // let createdAt = new Date(tweet.created_at);
  // let timePassed = now - createdAt;
  // const days = Math.floor(timePassed / (1000 * 60 * 60 * 24));
  
 let finalHTML = `<article>
<header class="user">
  <span> <img class="avatar" src="${tweet.user.avatar}"> ${tweet.user.name} </span>
  <div id="username">${tweet.user.handle}</div>
</header>
<p id="full-tweet">${tweet.content.text}</p>
<footer class="publish-info">
  <div>${now}</div>
  <div class="icons">
    <i class="fa-solid fa-flag" id="flag"></i>
    <i class="fa-solid fa-retweet" id="rt"></i>
    <i class="fa-solid fa-heart" id="heart"></i>
  </div>
</footer>
</article>`

return finalHTML;
};

//initial state - error messages hidden
$("#error-no-input").hide();
$("#error-chars").hide();

$("#form-tweet").submit(function(event) {
    event.preventDefault();

    const $textarea = $(this).find('textarea');
    const textLength = $textarea.val().trim().length;

    if (textLength === 0) {
      $( "#error-no-input" ).slideDown( "slow" );
      
    } else if (textLength > 140) {
      $( "#error-chars" ).slideDown( "slow" );
    } else {
    let data = $( this ).serialize()
    //once post has been completed - reload page
    $.ajax({url: "/tweets/", method: 'POST', data: data}).done(function(){
      window.location.reload();
    });
  }
});

// load tweets which have been posted
const loadTweets = $(function() {
  $.ajax({url: "/tweets/", method: 'GET', datatype: 'json'})
  .then(function(data) {
    console.log('Success: ', data);
    //empty so the page can load all new tweets
    $('#tweet-container').empty();
    renderTweets(data);
  })
})
});