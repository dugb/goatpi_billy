/**
 * @fileoverview GoatPi.com functions.
 */
const IMAGE_URL = "http://api.goatpi.com/image";
const DATA_URL = "http://api.goatpi.com/data";

const UPDATE_INTERVAL = 2 * 60 * 1000;  // 2 minutes
var httpRequest;
function onLoad() {
  /**
   * Loads an image from the api, /latestimage endpoint.
   *
   * @param {number} cacheBuster Used as a bogus parameter for cache busting.
   */
  function loadImage(cacheBuster) {
    const imageElement = document.getElementById("goat_cam");
    imageElement.setAttribute("src", IMAGE_URL + "?c=" + cacheBuster);
  }

  /**
   * Gets a random number from 0 to max-1.
   *
   * @param {number} max A positive integer.
   */
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function makeDataRequest() {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      console.log('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }
    httpRequest.onreadystatechange = loadData;
    httpRequest.open('GET', DATA_URL);
    httpRequest.send();
  }

  function loadData(){
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        console.log(httpRequest.responseText);
      } else {
        console.log('There was a problem with the request.');
      }
    }
  }

  loadImage(getRandomInt(10000));  // grab an image onLoad()
  makeDataRequest();  // grad data onLoad()

  setInterval(() => {
    loadImage(getRandomInt(10000));  // update the image at UPDATE_INTERVAL.
  }, UPDATE_INTERVAL);
}