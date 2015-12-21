function siteUpdater() {
  // make the notification bell link to discuss.codecademy.com/username/notifications
  if (window.CCDATA && window.CCDATA.current_user) {
    var username = window.CCDATA.current_user.username;
    $('.index__bell___2tSp1, .header__nav__link--notifications').attr("href", "http://discuss.codecademy.com/users/" + username + "/notifications");
  }

  // tell users about the new version
  if (!localStorage.getItem("Codecademy Redesigned 7.0.0")) {
    $('body').append('<div id="new-version-popup-container" class="new-version" style="display: none"><div class="popup-background"></div><div id="close-new-version-popup" class="popup-close">&times;</div><div class="popup"><h1>Welcome to Codecademy Redesigned 7.0.0</h1><a href="http://zystvan.com/codecademy-redesigned/7-0-0.html">See the new features here</a></div></div>');
    $('#new-version-popup-container').fadeIn();
    $('#close-new-version-popup').click(function() {
      $('#new-version-popup-container').fadeOut().remove();
    });

    localStorage.setItem("Codecademy Redesigned 7.0.0", "Seen");
  }

  // add extra data to user profiles
  var userDataUrl = window.location.href.substr(8).replace("/", "/api/v1/users/").toString();
  userDataUrl = window.location.protocol + "//" + userDataUrl;

  $.getJSON(userDataUrl, function(d) {
    CCDATA.user = d
  }).done(function() {
     $(".profiles.show article.fit-full.color-scheme--darkgrey").after('<article class="fit-full color-scheme--darkgrey"><div class="fit-fixed"><div class="grid-row profile-time" style="text-align: center;"><div class="grid-col-4 grid-col--align-center" style="float: none; display: inline-block;"><h3 class="padding-right--quarter">' + CCDATA.user.points_today + '</h3><small>points today</small></div><div class="grid-col-4 grid-col--align-center" style="float: none; display: inline-block;"><h3 class="padding-right--quarter">' + CCDATA.user.streak_hash.max_count + '</h3><small>day best streak</small></div><div class="grid-col-4 grid-col--align-center" style="float: none; display: inline-block"><h3 class="padding-right--quarter">' + CCDATA.user.points_hash.best_points_day + '</h3><small>best points day</small></div></div></div></article>');
  });

  // add a link in the footer to the github repo with some old group posts
  $('#footer #footer__main .grid-row #footer__company__links').after('<br><a href="https://github.com/A-J-C/CodecademyGroups">Codecademy Group posts saved on GitHub</a>');
}

var script = document.createElement("script");
script.textContent = "$(document).ready(" + siteUpdater.toString() + ")";
document.documentElement.appendChild(script);