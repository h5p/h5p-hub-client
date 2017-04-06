/**
 * Check whether an image exists at a specified URL
 *
 * @param  {string} imageUrl
 * @param {function(boolean)} callBack - handles response
 */
export function checkImageExists(imageUrl, callBack) {
  var imageData = new Image();
  imageData.src = imageUrl;

  imageData.onload = () => {
    callBack(true);
  };
  imageData.onerror = () => {
    callBack(false);
  };

  if (imageData.complete) {
    callBack(true);
  }
}
