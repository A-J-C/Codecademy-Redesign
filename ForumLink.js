var forum = function() {
  $("body").append("<style>.timestamp:hover,  div.answer_comments_block div.comment-details span:hover {cursor: pointer;color: #f65a5b;}</style>");

  $(document).on('click', '.timestamp', function() {
	var url = 'http://www.codecademy.com' + window.location.pathname + '#'; 
    link = $(this).closest('li.forum_response').attr('id');
    if (link == undefined) {link = ''}
    prompt('Copy to clipboard: Ctrl+C, Enter', url + link);
  }); 

  $(document).on('click', 'div.answer_comments_block div.comment-details span', function() {
	var url = 'http://www.codecademy.com' + window.location.pathname + '#'; 
    link = $(this).closest('li.forum_response_comment').attr('id'); 
    prompt('Copy to clipboard: Ctrl+C, Enter', url + link); 
  }); 
}
 
var script = document.createElement("script");
script.textContent = "$(document).ready(" + forum.toString() + ")";
document.documentElement.appendChild(script);
