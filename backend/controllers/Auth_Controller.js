// const User = require("../models/userSchema");
/****************************************************Requiring Modules*************************************************************** */
//Require face-api.js module to enable face detections and recognition
var faceapi = require("face-api.js");
//Twilio is the module to get otp service
var twilio = require("twilio");
//Axios provides a clean and easy-to-use API for sending asynchronous HTTP requests and handling responses
var axios = require("axios");
// Crypto is module used to encrypt and decrypt data using cryptographic algorithim
var crypto = require("crypto");
// Ethers module is used to interact with the Ethereum blockchain. It provides a wide range of functionalities, including creating and managing Ethereum wallets, signing and sending transactions, interacting with smart contracts, and working with Ethereum-specific data types.
const ethers = require("ethers");
// It is used to call the .env file and use the API keys or private key
require("dotenv").config();

/*****************************************************Setting up the blockchain**************************************************** */
// Fetch API_URL, PRIVATE_KEY and address of deployed contract
const API_URL = process.env.PROVIDER_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;

//It creates a new instance of the JsonRpcProvider class from the ethers.providers module.
//In the Ethereum ecosystem, a provider is responsible for connecting to an Ethereum network and communicating with it. The JsonRpcProvider class is a specific implementation of a provider that connects to an Ethereum network using the JSON-RPC protocol.
const provider = new ethers.providers.JsonRpcProvider(API_URL);

//It creates a new instance of the Wallet class from the ethers module. The Wallet class in the ethers library represents an Ethereum account that can sign transactions and messages. It provides a convenient way to manage Ethereum private keys and interact with the Ethereum network.
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

// In Ethereum development, the ABI is a standardized interface that defines the functions and data structures of a smart contract. It describes the contract's methods, input and output parameters, and the data types used.
const { abi } = require("../artifacts/contracts/UserAPI.sol/UserAPI.json");

//The ethers.Contract class allows you to interact with a deployed smart contract by providing a convenient interface for calling its functions, reading its state, and listening to its events.
const contractInstance = new ethers.Contract(contractAddress, abi, signer);

/********************************************************Set up the encryption and decryption*************************************** */
//"aes-256-cbc" refers to the Advanced Encryption Standard (AES) algorithm with a 256-bit key size, using the Cipher Block Chaining (CBC) mode of operation. AES is a symmetric encryption algorithm widely used for secure communication and data protection.
const encryptionAlgorithm = "aes-256-cbc";
//Private encryption key used to encrypt and decrypt. It is like a key of lock
const encryptionKey = process.env.ENCRYPTION_KEY;

// Function to encrypt data
function encryptData(data) {
  //Create the instance of cipher. crypto.createCipher() is a method that creates and returns a Cipher object that can be used for encryption.
  const cipher = crypto.createCipher(encryptionAlgorithm, encryptionKey);
  // It is used to update the cipher object and encrypt the provided data using the UTF-8 encoding. The encrypted data is then stored in the encryptedData variable as a hexadecimal string.
  let encryptedData = cipher.update(data, "utf8", "hex");
  //finalize the encryption process and obtain the remaining encrypted data from the cipher object
  encryptedData += cipher.final("hex");
  //return the decrypted data
  return encryptedData;
}

// Function to decrypt data
function decryptData(encryptedData) {
  //Create the instance of decipher. crypto.createDecipher() is a method that creates and returns a Decipher object that can be used for decryption.
  const decipher = crypto.createDecipher(encryptionAlgorithm, encryptionKey);
  // It is used to update the cipher object and encrypt the provided data using the UTF-8 encoding. The encrypted data is then stored in the encryptedData variable as a hexadecimal string.
  let decryptedData = decipher.update(encryptedData, "hex", "utf8");
  //finalize the encryption process and obtain the remaining encrypted data from the cipher object
  decryptedData += decipher.final("utf8");
  //return the decrypted data
  return decryptedData;
}
/***********************************************************Controllers************************************************************** */
//This is payment controller.
const payment = async (req, res) => {
  try {
    // This uses object destructuring to extract specific properties from the req.body object.
    const { firstname, lastname, email, cardnumber, expiration, cvv, amount } =
      req.body;
    // This imports the Stripe library and initializes it with the Stripe API key.
    const stripe = require("stripe")(process.env.STRIPE_KEY);
    // Using stripe object to make api calls. In body we are passing amount, card details, currency, description and payment method
    const paymentIntent = await stripe.paymentIntents.create({
      //Amount payed by user
      amount: amount,
      //Currency of user payment
      currency: "inr",
      // Description of users payment
      description: `Payment from ${firstname} ${lastname} of amount ${amount}`,
      // Payment method
      payment_method: "pm_card_in",
    });
    //if payment is succesfull then we are sending 200 OK response with few parameters. In this code, res represents the response object in an Express route handler. The status(200) method is used to set the HTTP status code of the response to 200, which indicates a successful request.The json() method is then called on the response object to send a JSON response body. It takes an object as an argument that will be converted to JSON format and sent as the response body.
    res.status(200).json({
      issuccesful: true,
      payment_id: paymentIntent.lastResponse.requestId,
    });
  } catch (error) {
    // If there is error during the payment, we will tackle the error here.
    console.log(error);
    // Send a response of status 400.
    res.status(400).json({
      code: 400,
      issuccesful: false,
    });
  }
};

//This is match user controller. It is called before payment to fetch the details of user just by scanning and recognising users.
const matchUser = async (req, res) => {
  try {
    // This uses object destructuring to extract specific properties from the req.body object.
    const { image } = req.body;
    
    // image data we are receiving is of object format. To find euclidean distance we need to have it in form of Float32Array. so we convert it to that format.
    const descriptions = new Float32Array(Object.values(image));
    // const users = await User.find({});
    //Initialise the recognised user as null. It will store the most confident/Matched user from blockchain network
    let recognizedUser = null;
    //This is threshold/min distance below which we can say that user is recognised
    let minDistance = 0.3;
    //This is the overall min distance of the users.
    let overallMinDistance = 1;
    //Here we fetch all the users from blockchain. We have already initialised contractInstance using private key. Without private key no has access to this.
    const users = await contractInstance.getAllUsers();
    //We will run facial recognition algorithim on all the users in blockchain.
    for (let i = 0; i < users.length; i++) {
      //All the data inside each block of user is encrypted. so we need to decrypt it first.
      // console.log(users[i]);
      // if(users[i] == null){
      //   continue;
      // }
      if(i == 1){
        continue;
      }
      const decryptedImageData = decryptData(users[i].facedata);
      //Now convert the decrypted data to json format
      const storedUserImageData = JSON.parse(decryptedImageData);
      //Convert the json object to Float32Array format to calculate euclidean distance.
      const userFace = new Float32Array(Object.values(storedUserImageData));
      //Here we calculate the euclidean distance of scanned user and user in blockchain
      const distance = faceapi.euclideanDistance(userFace, descriptions);
      //If the distance is less than the threshold value than this might be our user. So we compare it to best match user till now. if it better match than we also update it to that user.
      if (distance < minDistance && distance < overallMinDistance) {
        //update the overallMinDistance to have best match at the end
        overallMinDistance = distance;
        //update the recognised user to the matched user
        recognizedUser = users[i];
        //update the mindistance
        minDistance = distance;
      }
    }
    //There are two cases. One if user is recognised and other that user was not recognised.
    if (recognizedUser) {
      //If user is recognised than decrypt all the data of user
      const decryptedFirstname = decryptData(recognizedUser.firstname);
      const decryptedLastname = decryptData(recognizedUser.lastname);
      const decryptedPhone = decryptData(recognizedUser.phone);
      const decryptedEmail = decryptData(recognizedUser.email);
      const decryptedCardnumber = decryptData(recognizedUser.cardnumber);
      const decryptedExpiration = decryptData(recognizedUser.expiration);
      const decryptedCvv = decryptData(recognizedUser.cvv);

      //As user is now recognised, we are adding another security level. We sill send the otp to the user who is recognised.This will add another security level.
      // Your Account SID from www.twilio.com/console
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      // Your Auth Token from www.twilio.com/console
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      // Twilio instance is created using account id and auth token
      const client = new twilio(accountSid, authToken);
      let otp = "";
      //We are generating a random otp of 4 numbers in this for loop
      for (let i = 0; i < 6; i++) {
        otp += Math.floor(Math.random() * 10);
      }
      //The client.messages.create() method is called to create and send an SMS message. It takes an object as an argument, specifying the message body, recipient's phone number, and the Twilio phone number from which the message will be sent. The to and from properties should be set to the appropriate phone numbers.
      client.messages.create({
        body: "OTP : " + otp,
        to: "+91" + decryptedPhone, // Text this number
        from: process.env.TWILIO_NUMBER, // From a valid Twilio number
      });
      console.log(otp);
      //So now otp is sent to the users phone. Here will send the response with status 200 and with json body having details of user
      res.status(200).json({
        code: 200,
        otpSent: true,
        otp: otp,
        // walletAddress: recognizedUser.wallet,
        firstname: decryptedFirstname,
        lastname: decryptedLastname,
        phone: decryptedPhone,
        email: decryptedEmail,
        cardnumber: decryptedCardnumber,
        expiration: decryptedExpiration,
        cvv: decryptedCvv,
      });
    } else {
      //If user is not recognised than prompt that user was not found and send response with status 400.
      console.log("User not recognized.");
      res.status(404).json({
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

//Register controller
const register = async (req, res) => {
  try {
    // This uses object destructuring to extract specific properties from the req.body object.
    const {
      firstname,
      lastname,
      image,
      phone,
      gender,
      email,
      wallet,
      cardnumber,
      expiration,
      cvv,
    } = req.body;
    // Encrypt user data using encyptData function we created earlier
    const encryptedFirstname = encryptData(firstname);
    const encryptedLastname = encryptData(lastname);
    const imageDataString = JSON.stringify(image);
    const encryptedImage = encryptData(imageDataString);
    const encryptedPhone = encryptData(phone);
    const encryptedGender = encryptData(gender);
    const encryptedEmail = encryptData(email);
    const encryptedWallet = encryptData(wallet);
    const encryptedCardnumber = encryptData(cardnumber);
    const encryptedExpiration = encryptData(expiration);
    const encryptedCvv = encryptData(cvv);
    console.log("Encrypted First name : " + encryptedFirstname);
    console.log("Encrypted Last name : " + encryptedFirstname);
    console.log("Encrypted Face Data : " + encryptedFirstname);
    console.log("Encrypted Phone : " + encryptedFirstname);
    console.log("Encrypted Gender : " + encryptedFirstname);
    console.log("Encrypted Email : " + encryptedFirstname);
    console.log("Encrypted PAN Number : " + encryptedFirstname);
    console.log(
      "Encrypted Card Details : " +
        encryptedCardnumber +
        " " +
        encryptedExpiration +
        " " +
        encryptedCvv
    );
    //It is interacting with a contract instance to create a user using encrypted data. It then waits for the transaction to be mined and confirmed on the blockchain.
    const tx = await contractInstance.createUser(
      encryptedFirstname,
      encryptedLastname,
      encryptedImage,
      encryptedPhone,
      encryptedEmail,
      encryptedGender,
      encryptedCardnumber,
      encryptedExpiration,
      encryptedCvv
    );
    console.log("User Created");
    res.send("User registered successfully.");
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ code: 400, message: "invalid data or invalid syntax" });
  }
};

const sendOtpToUser = async (req, res) => {
  try {
    const { otp, phone } = req.body;
    const accountSid = "ACd7d4646fedbae6f8bc093c428260cf07"; // Your Account SID from www.twilio.com/console
    const authToken = "7713255f788da56ed030f14ddc3067c6"; // Your Auth Token from www.twilio.com/console
    const client = new twilio(accountSid, authToken);
    client.messages
      .create({
        body: "OTP : " + otp,
        to: "+91" + phone, // Text this number
        from: "+12543212331", // From a valid Twilio number
      })
      .then((message) => console.log(message.sid));
    console.log(otp + " sent to " + phone);
    //send otp to phone
    console.log("OTP sent successfully");
    res.status(200).json({ code: 200, otpSent: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: 400,
      otpSent: false,
      message: "invalid data or invalid syntax",
    });
  }
};

module.exports = {
  register,
  matchUser,
  // getUserDetails,
  sendOtpToUser,
  payment,
};
