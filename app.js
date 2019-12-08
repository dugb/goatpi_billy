const express = require('express');
const cors = require('cors');
const fs = require('fs');
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
const ABS_PATH = keys.ABS_PATH;
const DATA_PATH = keys.DATA_PATH;

/** Responds with the latest image. */
app.get('/latestimage', (reg, res) => {
  let imageList = fs.readdirSync(ABS_PATH);
  let mostRecentImage = ABS_PATH + imageList.slice(-1)[0];
  res.sendFile(mostRecentImage);
});

/** Responds with the latest image. */
app.get('/image', (reg, res) => {
  let imageList = fs.readdirSync(ABS_PATH);
  let mostRecentImage = ABS_PATH + imageList.slice(-1)[0];
  res.sendFile(mostRecentImage);
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
    const jsonString = fs.readFileSync(DATA_PATH + '/'+ 'data.json');
    data = JSON.parse(jsonString);
    
  } catch (err) {
    console.log(err);
    return;
  }
  return data;
}


app.listen(PORT, () =>
  console.log(`goatpi_billy server listening on port ${PORT}!`)
);
