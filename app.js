
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var mongoose = require('mongoose');

var index = require('./routes/index');
var homepage = require('./routes/homepage');
var login = require('./routes/login');
var createaccount = require('./routes/createaccount');
var editProfile = require('./routes/editProfile');
var sell = require('./routes/sell');
var itemforsale = require('./routes/itemforsale');
var addUser = require('./routes/addUser');
var buyItem = require('./routes/buyItem');

var editEmail = require('./routes/editEmail');
var editPassword = require('./routes/editPassword');
var editAddress = require('./routes/editAddress');
var editZipCode = require('./routes/editZipCode');
var editNotifications = require('./routes/editNotifications');
var editAboutMe = require('./routes/editAboutMe');
var logout = require('./routes/logout');
var notifications = require('./routes/notifications');
var filteredPage = require('./routes/filteredPage');
var search = require('./routes/search');

var checkNotifications = require('./routes/checkNotifications');

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'FinalCS147Project';
var local_database_uri  = 'mongodb://localhost/' + local_database_name;
var database_uri = process.env.MONGOLAB_URI || local_database_uri;
mongoose.connect(database_uri);


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.get('/login', login.view);
app.get('/createaccount', createaccount.view);
app.get('/editProfile', editProfile.view);
app.get('/sell', sell.view);

app.get('/start', homepage.view);

app.get('/homepage', homepage.view);
//app.get('/homepageAlternative', homepage.viewAlternative);


app.post('/itemforsale', itemforsale.view);
app.get('/addUser', addUser.view);
app.get('/buyItem/:id', buyItem.itemPurchased);
app.get('/editEmail/:newEmail', editEmail.editEmailInfo);
app.get('/editPassword/:newPassword', editPassword.editPasswordInfo);
app.get('/editAddress/:newAddress', editAddress.editAddressInfo);
app.get('/editZipCode/:newZipCode', editZipCode.editZipInfo);
app.post('/editAboutMe', editAboutMe.editAboutMeInfo);
app.get('/logout', logout.view);
app.get('/notifications', notifications.view);
app.get('/itemforsale', homepage.view);
app.get('/filteredPage/:category/:alternative', filteredPage.view);
app.get('/search', search.view);
app.get('/editNotifications', editNotifications.editNotifications);
app.get('/checkNotifications', checkNotifications.checkNotifications);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
