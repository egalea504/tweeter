const request = require('request-promise-native');

const fetchMyIP = new Promise((resolve, reject) => {

})
  request('https://api.ipify.org?format=json', (error, response, body) => {