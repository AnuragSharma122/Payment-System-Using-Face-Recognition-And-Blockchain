var express = require('express');
var router = express.Router();
const { register,matchUser } = require("../controllers/Auth_Controller");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('api working!!!!');
});

router.get("/api/matchUser", matchUser);

// router.post("/api/register", function (req, res, next) {
//   res.send("respond with a resource");
// });
router.post("/api/register",upload.single('image'), register);
module.exports = router;
