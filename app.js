const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const DataHandler = require('./dataHandler');
const ImageHandler = require('./imageHandler');
const keys = require('./keys');

const PORT = keys.PORT;
const IMG_PATH = keys.IMG_PATH;
const DATA_PATH = keys.DATA_PATH;


const db = mysql.createConnection ({
  host: keys.host,
  user: keys.user,
  password: keys.password,
  database: keys.database,
});

db.connect((err) => {
  if (err) {
      throw err;
  }
  console.log('Connected to database');
});
global.db = db;



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

// db READ query test.
app.get('/dbr', (req, res) => {
  let query = "SELECT datetime, temp, level FROM GoatData WHERE datetime = (SELECT max(datetime) FROM GoatData);";
  db.query(query, (err, result) => {
    if (err) {
        console.log('error: ', err);
    }
    console.log('results: ', result[0]);
    res.send(result[0])
    });
});

// db select all test.
app.get('/dball', (req, res) => {
  let query = "SELECT * FROM GoatData;";
  db.query(query, (err, result) => {
    if (err) {
        console.log('error: ', err);
    }
    console.log('results: ', result);
    res.send(result)
    });
});

// db WRITE query test.
app.get('/dbw', (req, res) => {
  let query = "INSERT INTO GoatData (temp, level) VALUES(19, 42);";
  db.query(query, (err, result) => {
    if (err) {
        console.log('error: ', err);
    }
    console.log('results: ', result[0]);
    res.send(result[0])
    });
});

app.listen(PORT, () =>
  console.log(`goatpi_billy started on port ${PORT}!`)
);

