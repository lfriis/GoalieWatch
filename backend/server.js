/*
GOALIEWATCH BACKEND SERVER
--------------------------------

Connecting to backend Atlas MongoDB database
Deploying express server to handle requests and routes sent by client
Cron job scheduler calling NHL API data scrape

--------------------------------
*/

// Declarations and packages included
const express  = require('express');
const app      = express();
const mongoose = require('mongoose');
const cron     = require('node-cron');
const shell    = require('shelljs');
const cors     = require('cors');
const port     = 8080;

// Including environemnt variable that posses connection string to MongoDB
require('dotenv').config();

// const sessionSecret = process.env.SESSION_SECRET;
// const sessionName   = process.env.SESSION_NAME;

// Including required middleware
app.use(cors());
app.use(express.json());

// Connecting to Atlas MongoDB
try 
{
  const uri = process.env.ATLAS_URI;
  mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

  const connection = mongoose.connection;
  connection.once('open', () => 
  {
    console.log("MongoDB Atlas connection successful!\n");
  });
}
catch (e) 
{
  console.log("Error connecting to MongoDB database: " + e);
}

// Routes 
var usersRouter         = require('./routes/users.js');
var goaliesRouter       = require('./routes/goalies.js');
var goalieRequestRouter = require('./routes/goalieRequest.js');
var emailDevsRouter     = require('./routes/emailDevs.js');

app.use('/users',         usersRouter);
app.use('/goalies',       goaliesRouter);
app.use('/goalieRequest', goalieRequestRouter);
app.use('/emailDevs',     emailDevsRouter);

// Cron job running NHL API goalie scrape running every 15 minutes
console.log("Cron scheduler ready...");
//cron.schedule("1 * * * * *", function() {
cron.schedule("* * 1 * * *", function() {
  console.log("Scheduler running goalie cron job...\n");
  if (shell.exec("python ./web-scrape/goalieCron.py").code !== 0) {
    console.log("Cron job did not successfully run");
  }
});

// Listening to requests sent by client
app.listen(port, function() 
{
  console.log('Server deployed...\nListening at address localhost:' + port + '\n');
});