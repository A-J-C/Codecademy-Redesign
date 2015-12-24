var qS = document.querySelector.bind(document),
    wmdButtonBar = qS('.wmd-button-bar');
    
function toggle(el){
  if(el.style.display === "none") el.style.display = "initial";
  else el.style.display = "none";
}

function hasClass(el, class){
  if (el.classList)
    el.classList.contains(class);
  else
    new RegExp('(^| )' + class + '( |$)', 'gi').test(el.class);
}

function toggleClass(el, class){
  if(hasClass(el, class)) el.classList.remove(class);
  else el.classList.add(class);
}

// jquery equivlent of .not
function jqNot(nodelist, sel){
  [].filter.call(nodelist, function(el) {
    return !el.matches(sel);
  });
}

function forumUpdater() {
  // for use below, they need to be defined globally
  var cannedResponses,
      HtmlListOfCannedResponses,
      cannedResponsesContainer = qS('.canned-response-container');

  // get the canned responses
  function getCannedResponses() {
    if (!localStorage.getItem("Canned Responses")) {
      cannedResponses = {}
      localStorage.setItem("Canned Responses", JSON.stringify(cannedResponses));
    }

    cannedResponses = JSON.parse(localStorage.getItem("Canned Responses"));

    return cannedResponses;
  };

  // generate the list of canned responses
  function generateHtmlListOfCannedResponses() {
    getCannedResponses();

    HtmlListOfCannedResponses = '<li id="new-canned-response"><a href="javascript:void(0);">Create new</a></li>';

    for (var i in cannedResponses) 
      HtmlListOfCannedResponses += '<li data-canned-response-id="' + i + '"><a href="javascript:void(0);">' + cannedResponses[i]["name"] + '</a></li>';
    

    return HtmlListOfCannedResponses;
  };

  // add the canned response button to the formatting bar
  function addCannedResponseButton() {
    qS('.wmd-button-bar .wmd-button-row').innerHTML += '<div class=\"wmd-spacer\" id=\"wmd-spacer3\"></div><button class=\"wmd-button wmd-canned-response-button\" id=\"wmd-canned-response-button\" title=\"Canned responses\" aria-label=\"Canned responses\"></button>';
    wmdButtonBar.innerHTML += '<div class="canned-response-container" id="canned-response-container"><ul id="canned-responses-list">' + HtmlListOfCannedResponses + '</ul></div>';
    cannedResponsesContainer.style.display = "none";
  };

  // create a new canned response
  function newCannedResponse() {
    var textarea = qS("textarea"),
        start = textarea.selectionStart,
        end = textarea.selectionEnd,
        cannedResponseText = textarea.value.substring(start, end),
        cannedResponseName = prompt("Please name your canned response:", cannedResponseText.slice(0, 10) + "...");

    if (!cannedResponseName) 
      return "You need to name your canned response!";

    cannedResponses[Object.keys(cannedResponses).length] = { "name": cannedResponseName, "body": cannedResponseText }
    localStorage.setItem("Canned Responses", JSON.stringify(cannedResponses));

    generateHtmlListOfCannedResponses();

    qS('#canned-responses-list').innerHTML = HtmlListOfCannedResponses;
  };

  // put the canned response text into the textarea
  function prefillWithCannedResponse(text) {
    qS('.wmd-input')[0].value = text;
    toggle(cannedResponsesContainer);
  };

  // collect all the other functions together and run them
  function runTheCannedResponseFunctions() {
    generateHtmlListOfCannedResponses();
    addCannedResponseButton();

    qS('#wmd-canned-response-button').addEventListener("click", function() {
      toggle(cannedResponsesContainer);
      toggleClass(wmdButtonBar, "active");
      

      jqNot(qS('#canned-responses-list li'), '#new-canned-response').addEventListener("click", function() {
        prefillWithCannedResponse(cannedResponses[this.getAttribute("data-canned-response-id")]["body"]);
        toggleClass(wmdButtonBar, "active");
      });

      qS('#new-canned-response').addEventListener("click", function() {
        newCannedResponse();
        toggleClass(wmdButtonBar, "active");
      });
    });
  }

  // detect when the text box is popped up, then run 
  var target = qS('#reply-control'),
      config = {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
      };

  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (document.querySelectorAll('#wmd-canned-response-button').length < 1) 
        runTheCannedResponseFunctions();
    });
  });

  observer.observe(target, config);
}
