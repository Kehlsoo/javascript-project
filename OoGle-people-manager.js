// The API toolkit for making REST systems easily
const express = require('express');
// A good solution for handling JSON data in routes
const bodyParser = require('body-parser');
// Node JS modules for filesystem access
const fs = require('fs');
// Our database connection
// This will be a JSON object of our programmers
// and can be accessed as if it was any other javascript
// object
const database = require('./programmers.json');

// Make an instance of our express application
const app = express();
// Specify our > 1024 port to run on
const port = 4051;

// Apply our middleware so our code can natively handle JSON easily
app.use(bodyParser.json());

// We must have our list of programmers to use
if (!fs.existsSync('./programmers.json')) {
  throw new Error('Could not find database of programmers!');
}

//returns all slaves
app.get('/all', (req, res) => {
  res.send(database);
});

//returns specific slave
app.get('/:id', (req, res) => {
  const id = req.params.id;

  //https://stackoverflow.com/questions/38679942/javascript-find-object-name-in-an-array
  let slave = database.find(o => o[id]);

  res.send(slave);
});

//update the slave's info
app.put('/:id', (req, res) => {
  const id = req.params.id;
  let slave = database.find(o => o[id]);

  slave.firstName = body.firstName;
  slave.lastName = body.lastName;
  slave.age = body.parseInt(body.age)
  slave.role = body.role;

  res.send(slave);
});

//make a new slave
app.post('/', (req, res) => {
  const body = req.body;
  database.push(body); //adds new slave to database
  res.send(`You sent: ${body}`);
});

// IMPLEMENT A ROUTE TO HANDLE ALL OTHER ROUTES AND RETURN AN ERROR MESSAGE
app.get("*", (req, res) => {
  res.send('3RROR!');
  console.log(`help`);
});


app.listen(port, () => {
  console.log(`She's alive on port ${port}`);
});