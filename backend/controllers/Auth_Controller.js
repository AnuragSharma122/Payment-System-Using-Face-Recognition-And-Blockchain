// const User = require("../models/userSchema");
const { creditCardConnection, usersConnection } = require("../models/Database");
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
    const { firstname, lastname, email, cardnumber, expiration, cvv, amount } =
      req.body;
    const stripe = require("stripe")(process.env.STRIPE_KEY);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "inr",
      description: `Payment from ${firstname} ${lastname} of amount ${amount}`,
      payment_method: "pm_card_in",
    });
    res.status(200).json({
      issuccesful: true,
      payment_id: paymentIntent.lastResponse.requestId,
    });
  } catch (error) {
    console.log(error);
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
    const descriptions = new Float32Array(Object.values(image));
    let recognizedUser = null;
    let minDistance = 0.3;
    let overallMinDistance = 1;
    let select_all_users_query = "SELECT * FROM user";
    usersConnection.query(select_all_users_query, (err, users) => {
      if (err) {
        throw new Error(err);
      }
      if (users) {
        // console.log(result[0]);
        for (let i = 0; i < users.length; i++) {
          const decryptedImageData = decryptData(users[i].image);
          const storedUserImageData = JSON.parse(decryptedImageData);
          const userFace = new Float32Array(Object.values(storedUserImageData));
          const distance = faceapi.euclideanDistance(userFace, descriptions);
          if (distance < minDistance && distance < overallMinDistance) {
            overallMinDistance = distance;
            recognizedUser = users[i];
            minDistance = distance;
          }
        }
        if (recognizedUser) {
          //If user is recognised than decrypt all the data of user
          const decryptedFirstname = decryptData(recognizedUser.firstname);
          const decryptedLastname = decryptData(recognizedUser.lastname);
          const decryptedPhone = decryptData(recognizedUser.phone);
          const decryptedEmail = decryptData(recognizedUser.email);
          let select_credit_card_userId = `SELECT * FROM credit_cards WHERE user_id = ${recognizedUser.id}`;
          creditCardConnection.query(
            select_credit_card_userId,
            (errr, creditCard) => {
              if (errr) {
                throw new Error(errr);
              }
              if (creditCard) {
                const decryptedCardnumber = decryptData(creditCard.cardnumber);
                const decryptedExpiration = decryptData(creditCard.expiration);
                const decryptedCvv = 123;

                // const accountSid = process.env.TWILIO_ACCOUNT_SID;
                // const authToken = process.env.TWILIO_AUTH_TOKEN;
                // const client = new twilio(accountSid, authToken);
                let otp = "1234";
                // for (let i = 0; i < 6; i++) {
                //   otp += Math.floor(Math.random() * 10);
                // }
                // client.messages.create({
                //   body: "OTP : " + otp,
                //   to: "+91" + decryptedPhone, // Text this number
                //   from: process.env.TWILIO_NUMBER, // From a valid Twilio number
                // });
                console.log(otp);
                res.status(200).json({
                  code: 200,
                  otpSent: true,
                  otp: otp,
                  firstname: decryptedFirstname,
                  lastname: decryptedLastname,
                  phone: decryptedPhone,
                  email: decryptedEmail,
                  cardnumber: decryptedCardnumber,
                  expiration: decryptedExpiration,
                  cvv: decryptedCvv,
                });
              }
            }
          );
        } else {
          //If user is not recognised than prompt that user was not found and send response with status 400.
          console.log("User not recognized.");
          res.status(404).json({
            code: 404,
            message: "User not recognized.",
            successfull: false,
          });
        }
      }
    });
    console.log("Hello");
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
    const encryptedPANNumber = encryptData(wallet);
    const encryptedCardnumber = encryptData(cardnumber);
    const encryptedExpiration = encryptData(expiration);
    const encryptedCvv = encryptData(cvv);
    let insert_new_user_query = `INSERT INTO user (firstname, lastname, image, phone, gender, email, pan_number) VALUES( 
      "${encryptedFirstname}",
      "${encryptedLastname}",
      "${encryptedImage}",
      "${encryptedPhone}",
      "${encryptedGender}",
      "${encryptedEmail}",
      "${encryptedPANNumber}");`;
    usersConnection.query(insert_new_user_query, (err, result) => {
      if (err) {
        // throw new error;
        // console.log(err);
        throw new Error(err);
        return;
      }
      if (result) {
        let insert_new_credit_card = `INSERT INTO credit_cards (cardnumber, expiration, user_id) VALUES(
          "${encryptedCardnumber}",
          "${encryptedExpiration}",
          "${result.insertId}"
        )`;
        creditCardConnection.query(insert_new_credit_card, (errr, resullt) => {
          if (errr) {
            let delete_user_with_id = `DELETE FROM table_name WHERE id == ${result.insertId} `;
            usersConnection.query(insert_new_user_query);
            console.log(errr);
            res.status(404).json(errr.code);
            throw new Error(errr);
          }
        });
      }
      console.log("Query run successfully!");
      res.status(201).json("User registered successfully.");
    });
    // console.log("Encrypted First name : " + encryptedFirstname);
    // console.log("Encrypted Last name : " + encryptedFirstname);
    // console.log("Encrypted Face Data : " + encryptedFirstname);
    // console.log("Encrypted Phone : " + encryptedFirstname);
    // console.log("Encrypted Gender : " + encryptedFirstname);
    // console.log("Encrypted Email : " + encryptedFirstname);
    // console.log("Encrypted PAN Number : " + encryptedFirstname);
    // console.log(
    //   "Encrypted Card Details : " +
    //     encryptedCardnumber +
    //     " " +
    //     encryptedExpiration +
    //     " " +
    //     encryptedCvv
    // );
    // //It is interacting with a contract instance to create a user using encrypted data. It then waits for the transaction to be mined and confirmed on the blockchain.
    // const tx = await contractInstance.createUser(
    //   encryptedFirstname,
    //   encryptedLastname,
    //   encryptedImage,
    //   encryptedPhone,
    //   encryptedEmail,
    //   encryptedGender,
    //   encryptedCardnumber,
    //   encryptedExpiration,
    //   encryptedCvv
    // );
    // console.log("User Created");
    // res.send("User registeration failesd");
  } catch (error) {
    // console.log(error);
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
