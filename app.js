const express = require('express');
const cors = require('cors');
const DataHandler = require('./dataHandler');
const ImageHandler = require('./imageHandler');
const keys = require('./keys');

const app = express();
app.use(cors());

const PORT = keys.port;
const ABS_PATH = keys.ABS_PATH;  // Absolute path of images
const DATA_PATH = keys.DATA_PATH;

/** Responds with the latest image. */
app.get('/image', (reg, res) => {
  const imageHandler = new ImageHandler();
  const imageList = imageHandler.getImageList(ABS_PATH).reverse();
  const sortedList = imageHandler.sortByModTime(imageList, ABS_PATH);
  let mostRecentImage = imageHandler.getSuitableImage(sortedList, ABS_PATH);
  if (mostRecentImage) {
    res.sendFile(mostRecentImage);
  } else {
    res.status(500);
    res.send('error')
  }
});

/** Responds with the latest data. */
app.get('/data', (req, res) => {
  const dataHandler = new DataHandler();
  const data = dataHandler.jsonReader(DATA_PATH + 'data.json')
  res.status(200).json(data)
});

app.listen(PORT, () =>
  console.log(`goatpi_billy server listening on port ${PORT}!`)
);
