import express from "express";
const router = express.Router();
import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validateToken from "../middlewares/AuthMiddleware.js";
import * as dotenv from "dotenv";

const config = dotenv.config().parsed;

router.post("/register", async (req, res) => {
  // const listOfFaculties = await faculties.findAll();
  //res.json(listOfFaculties);
  const post = req.body;

  await bcrypt.hash(post.password, 10).then((hash) => {
    const q = `INSERT INTO course_review.useraccounts (username, email, pass, regDate) VALUES ('${post.username}', '${post.email}', '${hash}', CURDATE())`;
    let check = 0;
    const q1 = `SELECT COUNT(*) as f from course_review.useraccounts WHERE username = '${post.username}'`;

    db.query(q1, (err, result) => {
      check = result[0].f;

      if (check == 0) {
        db.query(q, (err, result) => {
          res.json("LOGGED IN");
        });
      } else if (check > 0) {
        res.json({ error: "USERNAME ALREADY EXISTS" });
      }
    });
  });
});

router.post("/login", async (req, res) => {
  // const listOfFaculties = await faculties.findAll();
  //res.json(listOfFaculties);
  const post = req.body;

  const q = `SELECT COUNT(*) as f, username, email, pass from course_review.useraccounts WHERE username = '${post.username}'`;
  let check = 0;
  const q1 = `SELECT (username, password) from course_review.useraccounts WHERE username = '${post.username}' & password = '${post.password}'`;

  db.query(q, (err, result) => {
    check = result[0].f;

    if (check == 0) {
      res.json({ error: "Username doesn't exist!" });
    } else {
      bcrypt.compare(post.password, result[0].pass).then((match) => {
        if (!match) {
          res.json({ error: "Wrong Username and Password Combination" });
        } else {
          const accessToken = jwt.sign(
            { username: result[0].username, email: result[0].email },
            LOGIN
          );
          res.json(accessToken);
        }
      });
    }
  });

  //res.json(university);
});

router.get("/auth", validateToken, (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.json("");
  }
});

router.get("/posts", validateToken, (req, res) => {
  let username = req.user.username;
  //console.log(username);

  const q = `SELECT * FROM course_review.reviews WHERE username='${username}' ORDER BY dateUploaded DESC`;

  db.query(q, (err, result) => {
    try {
      //console.log(err);
      res.json(result);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  });
});

router.delete("/delete/:reviewID", validateToken, (req, res) => {
  const reviewID = req.params.reviewID;
  //console.log(reviewID);
  let username = req.user.username;
  //console.log(username);

  const q = `DELETE FROM course_review.reviews WHERE username='${username}' AND reviewID='${reviewID}'`;

  db.query(q, (err, result) => {
    try {
      res.json(result);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  });
});

export default router;
