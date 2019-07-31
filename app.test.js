const test = require("tape");
const nock = require("nock");
const myRequest = require("./app");

test("myRequest fetches data correctly", t => {
  nock("http://jsonplaceholder.typicode.com")
    .get("/users/1")
    .reply(200, {
      name: "Leanne Graham"
    });
  myRequest(
    "http://jsonplaceholder.typicode.com/users/1",
    (error, response) => {
      t.error(error);
      t.equal(
        response.statusCode,
        200,
        "the API should respond with a status code of 200"
      );
      t.deepEqual(
        response.body.name,
        "Leanne Graham",
        "the response body should contain the correct json"
      );
      t.end();
    }
  );
});

// BONUS - uncomment this test to see if myRequest handles https successfully:

// test("myRequest fetches data if API uses https", t => {
//   nock("https://jsonplaceholder.typicode.com")
//     .get("/users/1")
//     .reply(200, {
//       name: "Leanne Graham"
//     });
//   myRequest(
//     "https://jsonplaceholder.typicode.com/users/1",
//     (error, response) => {
//       t.error(error, "no https supported");
//       t.equal(
//         response.statusCode,
//         200,
//         "the API should respond with a status code of 200"
//       );
//       t.deepEqual(
//         response.body.name,
//         "Leanne Graham",
//         "the response body should contain the correct json"
//       );
//       t.end();
//     }
//   );
// });
