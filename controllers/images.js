const keys = require("../keys");
const helpers = require("../util/helpers");

/** Responds with the latest suitable image. */
exports.latestImage = function(req, res) {
  const date = helpers.todayStr();
  const imageList = helpers.getImageList(keys.IMG_PATH + date + "/");
  const sortedList = helpers.sortByModTime(
    imageList,
    keys.IMG_PATH + date + "/"
  );
  const mostRecentImage = helpers.getMostRecentSuitableImage(
    sortedList,
    keys.IMG_PATH + date + "/"
  );
  if (mostRecentImage) {
    res.sendFile(mostRecentImage);
  } else {
    res.status(500);
    res.send('error - no image found')
  }
};

exports.imageList = function(req, res) {
  const date = req.query.date;
  const imageList = helpers.getSuitableImageList(keys.IMG_PATH+date+'/');
  res.send(imageList);
};

exports.dateList = function(req, res) {
  const dateList = helpers.getDirList(keys.IMG_PATH);
  res.send(dateList);
};

exports.getImage = function(req, res) {
  const date = req.query.date;
  const name = req.query.name;
  const source = keys.IMG_PATH + date + '/' + name;
  const exists = true;  // todo check if file exists.
  if (exists) {
    res.sendFile(source);
  } else {
    res.status(500);
    res.send('error, image not found.');
  }
};
