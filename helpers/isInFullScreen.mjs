/* Function for checking if fullscreen, returns bool true or false */
export function isInFullscreen() {
  
    if (document.fullscreenElement && document.fullscreenElement.nodeName == 'BODY') {
    return true;
  }
  else {
    return false;
  }
 
};
