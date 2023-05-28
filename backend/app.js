/* 
* This is the root file of backend.
* First all the required modules are loaded.
* Then express instance is created and cors is used.
* After this we called the routers from ./routes/routeFile.js
* At last the express instance is exported
*/

//***********************************************Requiring necessary modules********************************************************* */

//dotenv is used to load environment variables from a .env file into process.env. So it keeps senstive data like passwords, Secretkey, etc out of code
require("dotenv").config();
// Express is node.js web app framework that provides broad features for building web application
var express = require("express");
// The CORS mechanism supports secure cross-origin requests and data transfers between browsers and servers.
const cors = require("cors");
// path module provides utilities for working with file and directory paths.
var path = require("path");
// The cookie-parser module is a middleware for parsing cookies in Node.js web applications.
var cookieParser = require("cookie-parser");
// It provides logging functionality to record information about incoming HTTP requests, such as the request method, URL, response status, response time, and more
var logger = require("morgan");
//The body-parser module is a middleware for Node.js web applications that allows you to parse the request body of incoming HTTP requests.
var bodyParser = require("body-parser");
// calling usersRouter to use routing
var usersRouter = require("./routes/users");

/*****************************************************Initialising Express to start backend****************************************** */

//It is initializing an instance of the Express.js application
var app = express();
//It  is configuring Cross-Origin Resource Sharing (CORS) in an Express.js application
app.use(cors());
//It  is configuring bodyparser
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//Configuring all the modules in express.js application
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//giving endpoint of the api as /users
app.use("/users", usersRouter);

//export express instance to .bin/www file to start the server
module.exports = app;

/****************************************************************End of Code*****8*************************************************** */
//Code to use mongoDB
// var mongoose = require("mongoose");
// var mongoDB = process.env.MONGO;
// mongoose
//   .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Connected to MongoDB Atlas!"))
//   .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));