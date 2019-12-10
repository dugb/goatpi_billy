const fs = require("fs");

module.exports = class DataHandler {
  constructor() {}

  jsonReader(dataFile) {
    let data;
    try {
      const jsonString = fs.readFileSync(dataFile);
      data = JSON.parse(jsonString);
    } catch (err) {
      console.log(err);
      return;
    }
    return data;
  }
};
