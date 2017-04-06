/**
 * Check whether an image exists at a specified URL
 *
 * @param  {object} image
 * @return {Promise}
 */
export function preloadImage(image) {
  return new Promise((resolve, reject) => {
    var imageData = new Image();
    imageData.src = image.url;

    imageData.onload = () => {
      image.valid = true;
      resolve(image);
    };
    imageData.onerror = () => {
      image.valid = false;
      resolve(image);
    };

    if (imageData.complete) {
      image.valid = true;
      resolve(image);
    }
  });

}

/**
 * Preload images
 *
 * @param {object[]} images
 * @return {Promise}
 */
export function preloadImages(images) {
  let promises = [];
  images.forEach(image => promises.push(preloadImage(image)));
  return Promise.all(promises);
}
