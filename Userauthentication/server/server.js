const express = require("express");
const mysql = require("mysql");
const path = require("path");
const bodyParser = require("body-parser");
const { connect } = require("http2");
const encodedbodyParser = bodyParser.urlencoded({ extended: false });
const app = express();
const userData = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "authentication",
  password: "Hriteshsql99",
  port: "3306",
});
const bcrypt = require("bcrypt");
app.post("/signup", encodedbodyParser, (req, res) => {
  let name = req.body.usrname;
  let email = req.body.usremail;
  let password = req.body.usrpassword;
  bcrypt.hash(password, 10, (err, hash) => {
    const query = `insert into userData(username,email,upassword) values("${name}","${email}","${hash}")`;
    userData.query(query, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // res.send("succefully signup");
        res.redirect("http://localhost:3000/login");
      }
    });
  });
});
app.post("/login", encodedbodyParser, (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  const query = `select * from userData where email ="${email}"`;

  userData.query(query, (err, result) => {
    if (result.length === 1) {
      console.log("succesfull");
      console.log(result);
      const chkpassword = result[0].upassword;
      bcrypt.compare(password, chkpassword, (err, result) => {
        if (result == true) {
          console.log("succesfully");
          res.redirect("http://localhost:3000/home");
        } else {
          console.log("failed");
        }
        if (err) {
          console.log(err);
        }
      });
    } else {
      console.log(err);
    }
  });
});
app.get("/homepage", (req, res) => {});
app.listen(2501);
