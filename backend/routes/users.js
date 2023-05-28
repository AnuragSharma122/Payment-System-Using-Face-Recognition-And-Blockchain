//This is a user routes file. All the endpoints in here will start from /users/. After this according to functionality, endpoints will come

//require express module
var express = require('express');
// creates an instance of the Express.js Router
var router = express.Router();
// calling nesscesary controllers
const {
  register,
  matchUser,
  sendOtpToUser,
  payment,
} = require("../controllers/Auth_Controller");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('api working!!!!');
});

/* GET user matched using facial recognition */
router.post("/api/matchUser", matchUser);
/* Post user to register*/
router.post("/api/register", register);
/* Send OTP to user*/
router.post("/api/send-otp", sendOtpToUser);
/*start payment*/
router.post("/api/payment", payment);
//export the router instance to app.js
module.exports = router;
