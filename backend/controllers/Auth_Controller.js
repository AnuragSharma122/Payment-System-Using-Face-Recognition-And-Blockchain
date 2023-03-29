const User = require("../models/userSchema");
var faceapi = require("face-api.js");

// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const user = new User(req.body);
  try {
    const { name, email, password, image } = req.body;

    // Use face-api.js to extract the facial template from the image
    const facialTemplate = await faceapi.computeFaceDescriptor(image);

    // Save the user and their facial template to the database
    const user = new User({
      first_name,
      last_name,
      facialTemplate,
      phone,
      gender,
      email,
      WalletAddress,
    });
    await user.save();
    res.send("User registered successfully.");
    // res.status(201).json({ code: 201,});
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ code: 400, message: "invalid data or invalid syntax" });
  }
};

module.exports = {
  register,
};
