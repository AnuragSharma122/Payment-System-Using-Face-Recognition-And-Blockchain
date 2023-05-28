require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
module.exports = {
  networks: {
    localganache: {
      url: process.env.PROVIDER_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
  solidity: "0.8.18",
};
