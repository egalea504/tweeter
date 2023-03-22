$(document).ready(function() {
  $("#tweet-text").on('keyup', function() {
    // on every keyup - it outputs the current count
    let currentCount = $(this).val().length
    // counter id which will display count
    let current = $("#counter")
    // character count is 140 chars - current count
    let characterCount = 140 - currentCount;

    //output text to counter
    current.text(characterCount);   
    
    if (currentCount > 140) {
      current.css('color', '#ff0000');
    }
  })
});