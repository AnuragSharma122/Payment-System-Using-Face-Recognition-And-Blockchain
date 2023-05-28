async function checkConnection() {
  // Retrieve the latest block number
  const latestBlock = await ethers.provider.getBlockNumber();

  console.log("Connected to Ganache. Latest block number:", latestBlock);
}

checkConnection()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Failed to connect to Ganache:", error);
    process.exit(1);
  });
