
/*
  This script will initialize a local Mongo database
  on your machine so you can do development work.

  IMPORTANT: You should make sure the

      local_database_name

  variable matches its value in app.js  Otherwise, you'll have
  initialized the wrong database.
  */

  var mongoose = require('mongoose');
  var models   = require('./models');

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'FinalCS147Project';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);


// Do the initialization here

// Step 1: load the JSON data
var notifications_json = require('./notifications.json');
var users_json = require('./users.json');
var items_json = require('./items.json');

// Step 2: Remove all existing documents
models.Notification
.find()
.remove()
  .exec(onceClear); // callback to continue at

// Step 3: load the data from the JSON file
function onceClear(err) {
  if(err) console.log(err);

  // loop over the projects, construct and save an object from each one
  // Note that we don't care what order these saves are happening in...
  var to_save_count = notifications_json.length + users_json.length + items_json.length; //+other lengths
  console.log("first to save count:" + to_save_count);
  for(var i=0; i<notifications_json.length; i++) {
    var json = notifications_json[i];
    var note = new models.Notification(json);

    note.save(function(err, note) {
      if(err) console.log(err);

      to_save_count--;
      console.log(to_save_count + ' left to save');
      if(to_save_count <= 0) {
        console.log('DONE');
        // The script won't terminate until the 
        // connection to the database is closed
        mongoose.connection.close()
      }
    });
  }


// Step 2: Remove all existing documents
models.User
.find()
.remove()
  .exec(onceClear2); // callback to continue at

// Step 3: load the data from the JSON file
function onceClear2(err) {
  if(err) console.log(err);

  // loop over the projects, construct and save an object from each one
  // Note that we don't care what order these saves are happening in...
  //var to_save_count = users_json.length;
  for(var i=0; i<users_json.length; i++) {
    var json = users_json[i];
    var note = new models.User(json);

    note.save(function(err, note) {
      if(err) console.log(err);

      to_save_count--;
      console.log(to_save_count + ' left to save');
      if(to_save_count <= 0) {
        console.log('DONE');
        // The script won't terminate until the 
        // connection to the database is closed
        mongoose.connection.close()
      }
    });
  }


// Step 2: Remove all existing documents
models.Item
.find()
.remove()
  .exec(onceClear3); // callback to continue at

// Step 3: load the data from the JSON file
function onceClear3(err) {
  if(err) console.log(err);

  // loop over the projects, construct and save an object from each one
  // Note that we don't care what order these saves are happening in...
  //var to_save_count = items_json.length;
  for(var i=0; i<items_json.length; i++) {
    var json = items_json[i];
    var note = new models.Item(json);

    note.save(function(err, note) {
      if(err) console.log(err);

      to_save_count--;
      console.log(to_save_count + ' left to save');
      if(to_save_count <= 0) {
        console.log('DONE');
        // The script won't terminate until the 
        // connection to the database is closed
        mongoose.connection.close()
      }
    });
  }
}
}
}