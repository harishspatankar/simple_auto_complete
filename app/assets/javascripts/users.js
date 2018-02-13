//returns string form object e
function get_character_typed(e){
  return String.fromCharCode(e.which);
}
//valid_key checks for alphabets when user enters letters between a-z or A-Z methods returns true
//for any other character returns false
function valid_key(charTyped){
  if (/[a-zA-Z]|\s/i.test(charTyped)) {
    return true;
  }
}
//after user clicks the drop down list text from list is copied to test field and list is then hided
function afterClickingOnList(){
  $("#result").on("click", "li", function(){
    var click_text = $(this).text().split('|');
    $("#search").val($.trim(click_text[0]));
    $("#result").html();
    $("#result").hide();
  });
}

function afterTypingFinish(e){
  console.log("request received");
  if(valid_key(get_character_typed(e))){
    $("#result").html("");
    var searchField = $("#search").val();
    var expression = new RegExp(searchField, "i");
    $.getJSON("http://localhost:3000/search_suggestions?search="+searchField, function(data){
      $.each(data, function(key, value){
        if(value.first_name.search(expression) != -1 || value.last_name.search(expression) != -1){
          $('#result').append('<li class="list-group-item link-class">' +value.first_name + ' ' + value.last_name +'</li>');
        }
      });
    });
  }
  afterClickingOnList();
}

var typingTimer;
$(document).ready(function(){
  $("#search").keyup(function(e){
    clearTimeout(typingTimer);
    if(($("#search").val().length) >= 3){
      //typingTimer = setTimeout(function(){console.log("AFTER 5 seconds")}, 5000);
      typingTimer = setTimeout(function(){afterTypingFinish(e)}, 500);
    }
  });
});
