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


// const db = mysql.createConnection({
//   host: keys.host,
//   user: keys.user,
//   password: keys.password,
//   database: keys.database,
// });

// todo(dugb) handle the db server closing the connection.
// db.connect((err) => {
//   if (err) {
//     throw err;
//   }
//   console.log('Connected to database');
// });
// global.db = db;

/** Responds with the latest image. */
app.get('/image', (reg, res) => {
  const imageHandler = new ImageHandler();
  // first check current date, then check prev dates until we get a list that is not empty.
  // we need to get a dir list.
  const date = todayStr();
  const imageList = imageHandler.getImageList(IMG_PATH + date + '/');
  console.log(imageList);
  const sortedList = imageHandler.sortByModTime(imageList, IMG_PATH + date + '/');
  const mostRecentImage = imageHandler.getMostRecentSuitableImage(sortedList, IMG_PATH + date + '/');
  if (mostRecentImage) {
    res.sendFile(mostRecentImage);
  } else {
    res.status(500);
    res.send('error - no image found')
  }
});

/** Responds with an array of images. */
app.get('/imagelist', (req, res) => {
  const date = req.query.date;
  const imageHandler = new ImageHandler();
  const imageList = imageHandler.getSuitableImageList(IMG_PATH+date+'/');
  res.send(imageList);
});

/** Responds with a list of image directories. */
app.get('/dirlist', (req, res) => {
  const source = keys.IMG_PATH;
  const imageHandler = new ImageHandler();
  const dirList = imageHandler.getDirectories(source);
  res.send(dirList);
});

/** Responds with the image from the date. */
app.get('/getimage', (req, res) => {
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
});

/** Responds with the latest data. */
app.get('/data', (req, res) => {
  const dataHandler = new DataHandler();
  const data = dataHandler.jsonReader(DATA_PATH + 'data.json')
  res.status(200).json(data)
});

function todayStr() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
  return yyyy + mm + dd;
}

// // db READ query test.
// app.get('/dbr', (req, res) => {
//   let query = "SELECT datetime, temp, level FROM GoatData WHERE datetime = (SELECT max(datetime) FROM GoatData);";
//   db.query(query, (err, result) => {
//     if (err) {
//       console.log('error: ', err);
//     }
//     console.log('results: ', result[0]);
//     res.send(result[0])
//   });
// });

// // db select all test.
// app.get('/dball', (req, res) => {
//   let query = "SELECT * FROM GoatData;";
//   db.query(query, (err, result) => {
//     if (err) {
//       console.log('error: ', err);
//     }
//     console.log('results: ', result);
//     res.send(result)
//   });
// });

// // db WRITE query test.
// app.get('/dbw', (req, res) => {
//   let query = "INSERT INTO GoatData (temp, level) VALUES(19, 42);";
//   db.query(query, (err, result) => {
//     if (err) {
//       console.log('error: ', err);
//     }
//     console.log('results: ', result[0]);
//     res.send(result[0])
//   });
// });

app.listen(PORT, () =>
  console.log(`goatpi_billy started on port ${PORT}!`)
);
