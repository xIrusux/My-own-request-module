"use strict";
const http = require("http");

const myRequest = (url, cb) => {
  http.get(url, res => {
    // console.log(res);
    const { statusCode } = res;
    // const contentType = res.headers["content-type"];

    // let error;
    // if (statusCode !== 200) {
    //   error = new Error(
    //     `Request Failed. \n` +
    //       `Expected application/json but received ${contentType}`
    //   );
    // }
    // if (error) {
    //   console.error(error.message);
    //   res.resume();
    //   cb(error);
    // }
    let rawData = "";
    res.on("data", chunk => {
      rawData += chunk;
    });
    res.on("end", () => {
      console.log(rawData);
      const object = {
        statusCode: statusCode,
        body: JSON.parse(rawData),
        headers: res.headers
      };

      cb(null, object);
    });

    res.on("error", e => {
      console.error(`Got error: ${e.message}`);
      cb(error);
    });
    console.log("Last line");
  });

  /*
  create your own request module here.
  It should take a url to make a http GET request, and a callback function with two arguments;
  1. error (String: if an error occurred),
  2. response(Object; includes the body & statusCode of the request)
  */
};

module.exports = myRequest;
