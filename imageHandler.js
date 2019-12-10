const sizeOf = require('image-size');
const fs = require('fs');

const MIN_FILESIZE = 1;  // bytes
const MIN_IMAGEWIDTH = 800;  // pixels
const MIN_IMAGEHEIGHT = 450;  // pixles


module.exports = class ImageHandler {
  constructor() {}

  getImageList(imagePath){
    return fs.readdirSync(imagePath).reverse();
  }

  /**
   * @param {Array<string>} imageList Array of image file names.
   * @param {string} imagePath Absolute path of the images.
   * @return {string} Absolute path of an image.
   */
  getSuitableImage(imageList, imagePath){
    let suitableImage;
    for (const img of imageList) {
      const image = imagePath + img.name;
      const stats = fs.statSync(image);
      if (stats.size >= MIN_FILESIZE) {
        const dimensions = sizeOf(image);
        if (dimensions.width >= MIN_IMAGEWIDTH && dimensions.height >= MIN_IMAGEHEIGHT) {
          suitableImage = image;
          break;
        }
      }
    }
    return suitableImage || undefined;
  }
  /**  
    * @param {Array<string>} imageList Array of image file names.
    * @param {string} imagePath Absolute path of the images.
    * @return {Array<string>}  Array of image file names, sorted by modified time.
    */
  sortByModTime(imageList, imagePath) {
    let sortedlist = [];
    for (const img of imageList) {
      const image = imagePath + img;
      const stat = fs.statSync(image);
      sortedlist.push({
        name: img,
        mtime: stat.mtime
      });
    }
    sortedlist.sort((a, b) => {
      return b.mtime - a.mtime;
    })
    return sortedlist;
  }
};
