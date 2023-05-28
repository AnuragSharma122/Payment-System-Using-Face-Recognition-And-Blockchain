var mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    cardnumber: {
      type: String,
      required: true,
      unique: true,
    },
    expiration: {
      type: String,
      required: true,
    },
    cvv: {
      type: String,
      required: true,
    },
    gender: String,
    email: String,
    wallet: String,
  },
  { collection: "Users" }
);

// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     try {
//       this.password = await bcrypt.hash(this.password, 12);
//     } catch (error) {
//       throw error;
//     }
//   }
//   next();
// });

//Generate a jwt auth token
// userSchema.methods.generateAuthenticationToken = async function () {
//   try {
//     //create Token
//     const token = jwt.sign(
//       { _id: this._id.toString() },
//       process.env.SECRET_KEY
//     );

//     //Store created token into database
//     this.tokens = this.tokens.concat([{ token: token }]);
//     await this.save();
//     return token;
//   } catch (error) {
//     throw error;
//   }
// };

const User = new mongoose.model("user", userSchema);

module.exports = User;
