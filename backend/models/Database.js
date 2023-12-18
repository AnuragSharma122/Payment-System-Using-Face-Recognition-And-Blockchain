const mysql = require("mysql2");

const creditCardConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "anurag",
  database: "FRPS_CREDIT_CARDS",
  multipleStatements: true,
});

creditCardConnection.connect(function (err) {
  if (err) throw err;
  console.log("Credit Card Database Connected!");
});

const usersConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "anurag",
  database: "FRPS_USERS",
  multipleStatements: true,
});

usersConnection.connect(function (err) {
  if (err) throw err;
  console.log("Users Database Connected!");
});

module.exports = {
  creditCardConnection,
  usersConnection,
};
