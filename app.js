const express = require('express');
const cors = require('cors');
const fs = require('fs');
const sizeOf = require('image-size');
// const config = require('./config');
const keys = require('./keys');

const app = express();
app.use(cors());

// for dev
// const PORT = config.port;
// const ABS_PATH = config.ABS_PATH;
// const DATA_PATH = config.DATA_PATH;

// for prod
const PORT = keys.port;
const ABS_PATH = keys.ABS_PATH;  // Absolute path of images
const DATA_PATH = keys.DATA_PATH;

const MIN_FILESIZE = 1;  // bytes
const MIN_IMAGEWIDTH = 800;  // pixels
const MIN_IMAGEHEIGHT = 450;  // pixles

/** Responds with the latest image. */
app.get('/image', (reg, res) => {
  const imageList = fs.readdirSync(ABS_PATH).reverse();
  const sortedList = sortByModTime(imageList);
  // use first image that has reasonable file size and dimensions.
  let mostRecentImage;
  for (const img of sortedList) {
    const image = ABS_PATH + img.name;
    const stats = fs.statSync(image);
    if (stats.size >= MIN_FILESIZE) {
      const dimensions = sizeOf(image);
      if (dimensions.width >= MIN_IMAGEWIDTH && dimensions.height >= MIN_IMAGEHEIGHT) {
        mostRecentImage = image;
        break;
      }
    }
  }
  if (mostRecentImage) {
    res.sendFile(mostRecentImage);
  } else {
    res.status(500);
    res.send('error')
  }

});

/** Responds with the latest data. */
app.get('/data', (req, res) => {
  jsonReader();
  const data = jsonReader();
  res.status(200).json(data)
});

function jsonReader() {
  let data;
  try {
    const jsonString = fs.readFileSync(DATA_PATH + 'data.json');
    data = JSON.parse(jsonString);

  } catch (err) {
    console.log(err);
    return;
  }
  return data;
}

function sortByModTime(imageList) {
  let sortedlist = [];
  for (img of imageList) {
    const image = ABS_PATH + img;
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


app.listen(PORT, () =>
  console.log(`goatpi_billy server listening on port ${PORT}!`)
);
