const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

// Routes.
const imageRoutes = require('./routes/imageRoutes');
app.use('/images', imageRoutes);
const dataRoutes = require('./routes/dataRoutes');
app.use('/data', dataRoutes);

const keys = require('./keys');
const PORT = keys.PORT;
const DATA_PATH = keys.DATA_PATH;




/** Responds with the latest data. */
app.get('/data', (req, res) => {
  const dataHandler = new DataHandler();
  const data = dataHandler.jsonReader(DATA_PATH + 'data.json')
  res.status(200).json(data)
});

app.listen(PORT, () =>
  console.log(`goatpi_billy started on port ${PORT}!`)
);
