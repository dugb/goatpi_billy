const express = require("express");
const cors = require("cors");
const fs = require("fs");
const config = require('./config');
const keys = require('./keys');

const app = express();
app.use(cors());

const PORT = config.port;
const SOURCE_DIR = config.SOURCE_DIR;
const ABS_PATH = config.ABS_PATH;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

app.get("/latestimage", (reg, res) => {
  let imageList = fs.readdirSync(SOURCE_DIR);
  let mostRecentImage = ABS_PATH + imageList[getRandomInt(20)];
  res.sendFile(mostRecentImage);
});
app.listen(PORT, () =>
  console.log(`goatpi_billy server listening on port ${PORT}!`)
);
