$(document).ready(function() {
  $("#form-tweet").submit(function(event) {
    event.preventDefault();
    alert("Form submitted");
    let data = $( this ).serialize()
    $.ajax({url: "/tweets/", method: 'POST', data: data})
})
});