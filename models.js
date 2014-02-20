var Mongoose = require('mongoose');

var UserSchema = new Mongoose.Schema({
	"firstName": String,
	"lastName": String,
	"password": String,
	"email": String,
	"address": String,
	"city": String,
	"state": String,
	"zip": String,
	"credits": Number,
	"notifications": [{"message": String, "seen": Boolean}]
});

var ItemSchema = new Mongoose.Schema({
	"image": String,
	"description": String,
	"price": Number,
	"category": String,
	"sellerEmail" : String,
	"sellerName" : String
});

var NotificationSchema = new Mongoose.Schema({
	"message": String,
	"user": String,
	"seen": Boolean,
	"date": { type: Date, default: Date.now}
})

exports.User = Mongoose.model('User', UserSchema);
exports.Item = Mongoose.model('Item', ItemSchema);
exports.Notification = Mongoose.model("Notification", NotificationSchema);