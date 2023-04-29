import mysql from "mysql";
//const mysql = require("mysql2");

const dbconfig = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
};

export default function queryPromise(queryString) {
  return new Promise((resolve, reject) => {
    var db;
    function handleDisconnect() {
      db = mysql.createConnection(dbconfig);
      db.connect(function (err) {
        if (err) {
          setTimeout(handleDisconnect, 2000);
        }
      });
      db.on("error", function (err) {
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
          console.log("디비연결종료:PROTOCOL_CONNECTION_LOST->재접속");
          handleDisconnect();
        } else {
          throw err;
        }
      });
    }
    handleDisconnect();

    db.query(queryString, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
}
