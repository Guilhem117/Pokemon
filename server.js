var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');	


var MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost/users", function(error, db) {
    if (error) {
    	console.log("Error : Database not Connected")
    }
    console.log("Database Connected");
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Locate Jquery and Bootstrap Libraries
app.use('/', express.static(__dirname + '/www')); // redirect root
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

app.use('/js', express.static(__dirname + '/js')); // redirect own js
app.use('/img', express.static(__dirname + '/img')); // redirect own images
app.use('/css', express.static(__dirname + '/css')); // redirect own css

var server = http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type": "text/html"});
});

//Main page
app.get('/', function(req, res) {
	

	res.render('main.ejs', {informativeMessage : ""});
});

app.post('/', function(req, res) {


	MongoClient.connect("mongodb://localhost/users", function(error, db) {

	    if (error) {
	    	console.log("Database Connected");
	    } else {
			var loginToAuthentificate = {login : req.body.inputLogin, pass : req.body.inputPassword};


			//See if a login is not already found
			db.collection("users").findOne(loginToApprove, function(err, result) { 

				//Not Found
				if (result == null) {

		    		res.render("main.ejs", {informativeMessage: ' <div class="alert alert-warning alert-dismissable"><a href="#" class="close" data-dismiss="alert" aria-label="close">×</a><strong>Warning!</strong> This alert box could indicate a warning that might need attention.</div>' + formSignIn});					
		    		
				//Crediential OK
				} else {
					res.render("main.ejs", {informativeMessage: '<div class="alert alert-success"><strong>Success !</strong>You are registred with the following login : ' +req.body.inputLogin +'<br/>Please, return to the main page and sign in :)</div>'});

				}
			
				
			});
		
		}

	});

	res.render('main.ejs', {informativeMessage : ""});
});

//DEPRECATED - Now it is integrate to the main page
//Signin page (It's a useless page because a guest have the same rights)
//app.get('/login', function(req, res) {
//    res.render('login.ejs');
//
//});


//Signup page (It's a useless page because a guest have the same rights)
app.get('/register', function(req, res) {
    res.render('register.ejs', {errorRegister : ""});
});

//Request from register page
app.post('/register', function(req, res) {


if (req.body.inputPassword == req.body.inputSamePassword) {


	MongoClient.connect("mongodb://localhost/users", function(error, db) {

	    if (error) {
	    	console.log("Database Connected");
	    } else {
			var loginToApprove = {login : req.body.inputLogin};


			//See if a login is not already found
			db.collection("users").findOne(loginToApprove, function(err, result) { 

			//	if (error) throw error;

				if (result == null) {

					db.collection("users").insert({login : req.body.inputLogin, pass : req.body.inputPassword});
					
		    		res.render("register.ejs", {errorRegister: '<div class="alert alert-success"><strong>Success !</strong>You are registred with the following login : ' +req.body.inputLogin +'<br/>Please, return to the main page and sign in :)</div>'});

				//Duplicate login
				} else {
		    		res.render("register.ejs", {errorRegister: '<div class="alert alert-warning"><strong>Warning ! </strong>The login "' + req.body.inputLogin + '" is already register, please choose another login :/</div>'});
				}
			
				
			});
		
		}

	});
//Different password
} else {
	res.render("register.ejs", {errorRegister: '<div class="alert alert-danger"><strong>Password are differents ! </strong></div>'});
			
}




});

//NOT FOUND Page
app.use(function(req, res, next){

	//redirect to the main page
    res.render("main.ejs", {informativeMessage : "404 Redirect"});


});

app.listen(8080);
console.log("Server Running at http://localhost:8080/");