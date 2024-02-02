const express = require("express");
const path = require("path");
const body_parser = require("body-parser");
const bcrypt = require("bcrypt");
const mysql = require("mysql");
const { connection } = require("mongoose");

const encodedbodyParser = body_parser.urlencoded({ extends: false });

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "pizaApp",
  password: "Hriteshsql99",
  port: "3306",
});
app.get("/alldata", (req, res) => {});

app.post("/signup", encodedbodyParser, (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  let phone = req.body.number;

  bcrypt.hash(password, 10, (err, hash) => {
    const query = `insert into userData(usrname,usrEmail,usrPassword,usrMobile) values("${name}","${email}","${hash}","${phone}")`;
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
      } else {
      }
    });
  });
});
app.post("/login", encodedbodyParser, (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  const query = `select * from userData where usrEmail = "${email}"`;

  db.query(query, (err, result) => {
    if (result.length >= 1) {
      console.log(result);
      const chkpassword = result[0].usrPassword;
      bcrypt.compare(password, chkpassword, (err, result) => {
        if (result == true) {
          res.redirect("http://localhost:3000/menu");
        } else {
          console.log("failed");
        }
      });
    } else {
      console.log(err);
    }
  });
});

app.post("/orderform", encodedbodyParser, (req, res) => {
  let category = req.body.category;
  let topping = req.body.topping;
  let size = req.body.size;
  let quantity = req.body.quantity;
  let address = req.body.address;

  const sql = `insert into orderData(category,topping,size,quantity,address) values("${category}","${topping}","${size}","${quantity}","${address}")`;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Your order is confirm");
    }
  });
});
app.listen(3024, () => {
  console.log("server successfully started");
});
