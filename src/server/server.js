const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
let projectData = {};



app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Server Setup and Routes
const port = 8081;
app.listen(port, function () {
  console.log(`Congratulations, your server is running at port ${port}!`);
});

app.get('/', function (req, res) {
  res.sendFile('dist/index.html');
});
