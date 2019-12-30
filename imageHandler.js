const sizeOf = require('image-size');
const fs = require('fs');

const MIN_FILESIZE = 1; // bytes
const MIN_IMAGEWIDTH = 800; // pixels
const MIN_IMAGEHEIGHT = 450; // pixles


module.exports = class ImageHandler {
  constructor() {}

  /** 
   * Gets all files from a directory.
   * @param {string} imagePath  Abs path of the directory.
   * @return {Array<string>}  Array of file names.
   */
  getImageList(imagePath) {
    let dirListing = fs.readdirSync(imagePath);
    let fileList = [];
    for (const i of dirListing) {
      if(fs.statSync(imagePath + i).isFile()){
        fileList.push(i);
      }
    }
    return fileList;
  }

  /** 
   * Returns an array of filenames of suitable images.
   * 
   * I want to use this for a slideshow of all images for a date. Subject to
   * change but I'm thinking the client will request a list of filenames
   * (filenames only, I don't want the client to know anything about the 
   * backends directory structure),  the client will then set the image url
   * to something like:
   *  https://goatpi.com/getImageUrl?image=filename&date=20191218
   * then the get request handler will serve back the requested image.
   * 
   * 
   * // todo(dugb) need to have a source images seperated into directories by 
   *    date.
   * 
   * @param {string} imagePath Absolute path of the images.
   * @return {Array<string>}  Array of file names
   */
  getSuitableImageList(imagePath) {
    const imageList = this.getImageList(imagePath);
    const sortedImageList = this.sortByModTime(imageList, imagePath);
    let suitableImageList = [];
    for (const img of sortedImageList) {
      const image = imagePath + img.name;
      if (this.isSuitableImage(image)) {
        suitableImageList.push(img.name)
      }
    }
    return suitableImageList;
  }

  /** 
   * Checks if an image is suitable for display.
   * checks file size, width and height
   * @param {string} image Absolute path and file name of the image.
   * @returns {boolean}  True if suitable.
   */
  isSuitableImage(image) {
    const stats = fs.statSync(image);
    if (stats.size < MIN_FILESIZE) {
      return false;
    }
    const dimensions = sizeOf(image);
    if (dimensions.width < MIN_IMAGEWIDTH && dimensions.height < MIN_IMAGEHEIGHT) {
      return false;
    }
    return true;
  }

  /**
   * Returns the first suitable image from an array of images.
   * For our use-case the array of images has been presorted by modified-time.
   * 
   * @param {Array<string>} imageList Array of image file names.
   * @param {string} imagePath Absolute path of the images.
   * @return {string | undefined} Absolute path of the suitable image or undefined if a suitable image was not found.
   */
  getMostRecentSuitableImage(imageList, imagePath) {
    console.log(imagePath)
    for (const img of imageList) {
      const image = imagePath + img.name;
      if (this.isSuitableImage(image)) {
        return image;
      }
    }
    return undefined;
  }

  /**  
   * @param {Array<string>} imageList Array of image file names.
   * @param {string} imagePath Absolute path of the images.
   * @return {Array<Object>}  Array of image file names and modified times, sorted by modified-time.
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

  getDirectories(source) {
    let dirListing = fs.readdirSync(source);
    let dirList = [];
    for (const i of dirListing) {
      if(fs.statSync(source + i).isDirectory()){
        dirList.push(i);
      }
    }
    return dirList;
    // return fs.readdirSync(source, { withFileTypes: true })
    //   .filter(dirent => dirent.isDirectory())
    //   .map(dirent => dirent.name)
  }
};
