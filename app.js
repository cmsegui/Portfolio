const express = require('express'); // Loading the express module on our server
const app = express(); // Creates a new instance of express on our server


app.get("/", function(req, res){
  res.send('Portfolio');
});

app.get("/:name", function(req, res){
  console.log(req.params);
  res.send(`Hello, ${req.params.name}!`);
});

app.get('/works', function(req, res) {
  res.send('Works');
});

const port = process.env.PORT || 3000; // tells the server where to listen for requests

app.listen(port, function() {
  // tells the server where to listen for requests on port 3000

  console.log('Listening on port ' + port);
}); // actualizing the line above

