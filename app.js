const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

// Routes
const imageRoutes = require('./routes/imageRoutes');
app.use('/images', imageRoutes);
const dataRoutes = require('./routes/dataRoutes');
app.use('/data', dataRoutes);

const keys = require('./keys');
const PORT = keys.PORT;

app.listen(PORT, () =>
  console.log(`goatpi_billy started on port ${PORT}!`)
);
