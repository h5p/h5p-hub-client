/**
 * Check whether an image exists at a specified URL
 *
 * @param  {object} image
 * @return {Promise<HTMLImageElement>}
 */
export function preloadImage(image) {
  return new Promise((resolve, reject) => {
    const imageData = new Image();
    imageData.src = image.url;

    imageData.onload = () => resolve(image);
    imageData.onerror = () => reject(image);

    if (imageData.complete) {
      resolve(image);
    }
  });
}

/**
 * Preload images
 *
 * @param {object[]} images
 * @return {Promise<HTMLImageElement[]>}
 */
export function preloadImages(images) {
  const IMAGE_LOAD_FAIL = null;

  const promises = images
    .map(preloadImage)
    .map(image => image.catch(err => IMAGE_LOAD_FAIL));

  return Promise.all(promises)
    .then(images =>  images.filter(image => image !== IMAGE_LOAD_FAIL));
}
