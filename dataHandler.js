const fs = require('fs');


module.exports = class DataHandler {
  constructor() {}

  /**
   * @param {string} dataFile Absolute path of a JSON data file.
   * @return {Object}
   */
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
