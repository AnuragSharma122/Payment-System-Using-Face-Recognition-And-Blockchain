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

const matchUser = async (req, res) => {
  try {
    const input = "./assets/image1.jpg";
    const img = await canvas.loadImage(input);
    const inputFace = await faceapi
      .detectSingleFace(img)
      .withFaceLandmarks()
      .withFaceDescriptor();
    const users = await User.find({});
    console.log("Users loaded from database");

    let recognizedUser = null;
    let minDistance = 0.4;
    for (let i = 0; i < users.length; i++) {
      // const userFace = new Float32Array(
      //   Object.values(users[i].facialTemplate)
      // );
      // const userFace = new Float32Array(users[i].facialTemplate);
      const userFace = new Float32Array(
        Object.values(users[i].facialTemplate.descriptor)
      );
      // const userFace = users[i].facialTemplate.map((num) => parseFloat(num));
      // console.log(userFace.length);
      // console.log(inputFace.length);
      const distance = faceapi.euclideanDistance(
        userFace,
        inputFace.descriptor
      );
      console.log(`User ${i}: ${distance}`);

      // Choose the user with the smallest distance to the input face as the recognized user
      if (distance < minDistance) {
        recognizedUser = users[i];
        minDistance = distance;
      }
    }

    if (recognizedUser) {
      console.log(
        `User recognized: ${recognizedUser.firstname} ${recognizedUser.lastname}`
      );
      res.json({ message: "User recognized.", recognizedUser });
    } else {
      console.log("User not recognized.");
      res.status(404).json({ code: 404, message: "User not recognized." });
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ code: 400, message: "invalid data or invalid syntax" });
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
};
