//function that does the work.
function findLikesDislikes(){
  var buttons = document.querySelectorAll('#menu ytd-toggle-button-renderer button.style-scope.yt-icon-button');
  var likesText = dislikesText = '';
  var likeTextContainer = dislikeTextContainer = null

  if(buttons.length > 1){
    likesText = buttons[0].attributes['aria-label'].nodeValue
    dislikesText = buttons[1].attributes['aria-label'].nodeValue
  
    likeTextContainer = buttons[0].parentNode.parentNode.querySelector('yt-formatted-string');
    dislikeTextContainer = buttons[1].parentNode.parentNode.querySelector('yt-formatted-string');
    
    var newLikeTextContainer = likeTextContainer.cloneNode();
    var newDislikeTextContainer = dislikeTextContainer.cloneNode();
    newLikeTextContainer.id = 'text2';
    newDislikeTextContainer.id = 'text2';
    
    if(likeTextContainer.innerText.toLowerCase() !== 'like' && dislikeTextContainer.innerText.toLowerCase() !== 'dislike'){
      likeTextContainer.style.display = '';
      dislikeTextContainer.style.display = '';
      return true;
    }
    var textToFind = 'along with ';
    likesText = likesText.substring(likesText.indexOf(textToFind) + textToFind.length);
    dislikesText = dislikesText.substring(dislikesText.indexOf(textToFind) + textToFind.length);
    var likesTextArr = likesText.split(' ');
    var dislikesTextArr = dislikesText.split(' ');
    var likesCount = likesTextArr[0];
    var dislikesCount = dislikesTextArr[0];

    likeTextContainer.style.display = 'none';
    dislikeTextContainer.style.display = 'none';

    newLikeTextContainer.setAttribute('aria-label', `${likesCount} likes`);
    newDislikeTextContainer.setAttribute('aria-label', `${dislikesCount} dislikes`);
    newLikeTextContainer.innerHTML = likesCount;
    newDislikeTextContainer.innerHTML = dislikesCount;
    newLikeTextContainer.style.display = '';
    newDislikeTextContainer.style.display = '';

    likeTextContainer.parentNode.appendChild(newLikeTextContainer);
    dislikeTextContainer.parentNode.appendChild(newDislikeTextContainer);
    return true;
  }
  return false;
}

//call the function
function callFindLikesDislikes() {
  var iteration = 0;
  var interval = setInterval(() => {
   if(findLikesDislikes()){
     clearInterval(interval);
   }
   if(iteration === 20){
      clearInterval(interval);
    }
    iteration++;
  }, 500);
}
callFindLikesDislikes();

var oldHref = document.location.href;

window.onload= function () {
  var bodyList = document.querySelector("body"), 
    observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (oldHref != document.location.href) {
          oldHref = document.location.href;
          setTimeout(callFindLikesDislikes, 500);
        }
      });
   });

  var config = {
    childList: true,
    subtree: true
  };

  observer.observe(bodyList, config);
}
