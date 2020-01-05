const sizeOf = require('image-size');
const fs = require('fs');

const MIN_FILESIZE = 1; // bytes
const MIN_IMAGEWIDTH = 800; // pixels
const MIN_IMAGEHEIGHT = 450; // pixles

/**
 * Returns todays date as a string in a format that matches our directory names
 * that contain images 'yyyymmdd'.
 */
exports.todayStr = function() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();
  return `${yyyy}${mm}${dd}`;
};

/** 
 * Gets all files from a directory.
 * 
 * @param {string} imagePath  Absolute path of the directory.
 * @return {Array<string>}  A list of file names.
 */
exports.getImageList = function(imagePath) {
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
 * Gets all sub-directories from a directory.
 * 
 * @param {string} source  Absolute path of the directory.
 * @return {Array<string>}  A list of directory names.
 */
exports.getDirList = function(source) {
  let dirListing = fs.readdirSync(source);
  let dirList = [];
  for (const i of dirListing) {
    if(fs.statSync(source + i).isDirectory()){
      dirList.push(i);
    }
  }
  return dirList;
}

/**
 * Sorts a list of files by modified time.
 * 
 * @param {Array<string>} imageList Array of image file names.
 * @param {string} imagePath Absolute path of the images.
 * @return {Array<Object>}  Array of image file names and modified times, sorted by modified-time.
 */
exports.sortByModTime = function(imageList, imagePath) {
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

/**
 * Returns the first suitable image from an array of images.
 * For our use-case the array of images has been presorted by modified-time.
 * 
 * @param {Array<string>} imageList Array of image file names.
 * @param {string} imagePath Absolute path of the images.
 * @return {string | undefined} Absolute path of the suitable image or 
 *  undefined if a suitable image was not found.
 */
exports.getMostRecentSuitableImage = function(imageList, imagePath) {
  for (const img of imageList) {
    const image = imagePath + img.name;
    if (this.isSuitableImage(image)) {
      return image;
    }
  }
  return undefined;
}

/** 
 * Checks if an image is suitable for display by checking file size, width and
 * height.
 * 
 * @param {string} image Absolute path and file name of the image.
 * @returns {boolean}  True if suitable.
 */
exports.isSuitableImage = function(image) {
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
exports.getSuitableImageList = function(imagePath) {
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

exports.jsonReader = function(dataFile) {
  let data;
  try {
    const jsonString = fs.readFileSync(dataFile);
    data = JSON.parse(jsonString);
  } catch (err) {
    console.log(err);
    return;
  }
  return data;
}  