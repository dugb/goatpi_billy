const express = require('express');
const cors = require('cors');

const DataHandler = require('./dataHandler');
const ImageHandler = require('./imageHandler');
const keys = require('./keys');

const app = express();
app.use(cors());

const PORT = keys.PORT;
const IMG_PATH = keys.IMG_PATH;
const DATA_PATH = keys.DATA_PATH;

/** Responds with the latest image. */
app.get('/image', (reg, res) => {
  const imageHandler = new ImageHandler();
  const imageList = imageHandler.getImageList(IMG_PATH);
  const sortedList = imageHandler.sortByModTime(imageList, IMG_PATH);
  const mostRecentImage = imageHandler.getSuitableImage(sortedList, IMG_PATH);
  if (mostRecentImage) {
    res.sendFile(mostRecentImage);
  } else {
    res.status(500);
    res.send('error - no image found')
  }
});

/** Responds with the latest data. */
app.get('/data', (req, res) => {
  const dataHandler = new DataHandler();
  const data = dataHandler.jsonReader(DATA_PATH + 'data.json')
  res.status(200).json(data)
});

app.listen(PORT, () =>
  console.log(`goatpi_billy started on port ${PORT}!`)
);
