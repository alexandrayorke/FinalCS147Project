
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');

var index = require('./routes/index');
var homepage = require('./routes/homepage');
var login = require('./routes/login');
var createaccount = require('./routes/createaccount');
var editProfile = require('./routes/editProfile');
var sell = require('./routes/sell');
var itemforsale = require('./routes/itemforsale');
var addUser = require('./routes/addUser');
var buyItem = require('./routes/buyItem');
var editAccount = require('./routes/editAccount');
var editAddress = require('./routes/editAddress');


// Example route
// var user = require('./routes/user');

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
app.get('/homepage', homepage.view);
app.get('/itemforsale', itemforsale.view);
app.get('/addUser', addUser.view);
app.get('/buyItem/:id', buyItem.itemPurchased);
app.get('/editAccount/:newEmail/:newPassword', editAccount.editAccountInfo);
app.get('/editAddress/:newAddress/:newZipCode', editAddress.editAddressInfo);

// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
