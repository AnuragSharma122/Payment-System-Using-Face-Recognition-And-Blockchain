const User = require("../models/userSchema");
var faceapi = require("face-api.js");
var canvas = require("canvas");
var fetch = require("node-fetch");

const MODEL_URL = "./faceModel";
faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL);
faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL);
faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_URL);
const { Canvas, Image, ImageData, createCanvas, loadImage } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });
faceapi.env.monkeyPatch({ fetch: fetch });

const getUserDetails = async (req, res) => {
  const walletAddress = req.params.walletAddress;
  console.log("started");
  try {
    console.log(walletAddress);
    const user = await User.findOne({ wallet: walletAddress });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json({
      firstname: user.firstname,
      lastname: user.lastname,
      phone: user.phone,
      email: user.email,
      gender: user.gender
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
const matchUser = async (req, res) => {
  try {
    const { amount, image, paid } = req.body;
    const img = await canvas.loadImage(image);
    const inputFace = await faceapi
      .detectSingleFace(img)
      .withFaceLandmarks()
      .withFaceDescriptor();
    const users = await User.find({});
    console.log("Users loaded from database");

    let recognizedUser = null;
    let minDistance = 0.5;
    for (let i = 0; i < users.length; i++) {
      const userFace = new Float32Array(
        Object.values(users[i].facialTemplate.descriptor)
      );
      const distance = faceapi.euclideanDistance(
        userFace,
        inputFace.descriptor
      );
      console.log(`User ${i}: ${distance}`);
      if (distance < minDistance) {
        recognizedUser = users[i];
        minDistance = distance;
      }
    }

    if (recognizedUser) {
      //process blockchain payment here
      /*
        here blockchain part will come and payment will be processed
      */
      //return succesfull payment
      console.log(
        `User recognized: ${recognizedUser.firstname} ${recognizedUser.lastname}`
      );
      res.json({ message: "User recognized.", successfull: true });
    } else {
      console.log("User not recognized.");
      res
        .status(404)
        .json({
          code: 404,
          message: "User not recognized.",
          successfull: false,
        });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: 400,
      message: "invalid data or invalid syntax",
      successfull: false,
    });
  }
};

const register = async (req, res) => {
  try {
    //Get all fields from request body
    const { firstname, lastname, image, phone, gender, email, wallet } =
      req.body;
    //Load image in canvas and find facial data using face-api.js
    console.log("Loading Image");
    const img = await canvas.loadImage(image);
    console.log("Image Loaded");
    // const facialTemplate = await faceapi.computeFaceDescriptor(img);
    const facialTemplate = await faceapi
      .detectSingleFace(img)
      .withFaceLandmarks()
      .withFaceDescriptor();
    // const facialTemplate = Buffer.from(ft.buffer);
    //Create user using all data provided
    const user = new User({
      firstname,
      lastname,
      facialTemplate,
      phone,
      gender,
      email,
      wallet,
    });
    console.log("User Created");
    await user.save();
    res.send("User registered successfully.");
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ code: 400, message: "invalid data or invalid syntax" });
  }
};

module.exports = {
  register,
  matchUser,
  getUserDetails,
};
