var express = require('express');
var router = express.Router();
const { register } = require("../controllers/Auth_Controller");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/api/register", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
