/*
GOALIEWATCH BACKEND SERVER
--------------------------------

Connecting to backend Atlas MongoDB database
Deploying express server to handle requests and routes sent by client
Cron job scheduler calling NHL API data scrape

--------------------------------
*/

// Declarations and packages included
try
{
  var express        = require('express');
  var app            = express();
  var mongoose       = require('mongoose');
  var cron           = require('node-cron');
  var shell          = require('shelljs');
  var cors           = require('cors');
  var session        = require('express-session');
  var port           = 8080;

  // Including environemnt variable that posses connection string to MongoDB
  require('dotenv').config();

  const sessionSecret = process.env.SESSION_SECRET;
  const sessionName   = process.env.SESSION_NAME;

  // Including required middleware
  app.use(cors());
  app.use(express.json());
  
  // Setting session variable and cookie for each users sessions
  app.set('trust proxy', 1)
  app.use(session ({
    name: sessionName,
    resave: false,
    saveUninitialized: false,
    secret: sessionSecret,
    cookie: {
      maxAge: 60000,
      sameSite: "strict",
      secure: true
    },
  }));

  console.log("\nAll necessary packages included...");
}
catch(e) {console.log("Errors including packages: " + (e));}

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
  console.log('Server deployed...\n' + 'Listening at address localhost:' + port + '\n');
});