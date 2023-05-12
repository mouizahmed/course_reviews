import express from "express";
const router = express.Router();
import { db } from "../db.js";
import validateToken from "../middlewares/AuthMiddleware.js";
//const { faculties } = require('../models');

router.get("/:uniTag/:facultyName/:courseID", async (req, res) => {
  // const listOfFaculties = await faculties.findAll();
  //res.json(listOfFaculties);
  const uniTag = req.params.uniTag;
  const facultyName = req.params.facultyName;
  const courseID = req.params.courseID;
  const q = `SELECT * FROM reviews WHERE universityTag = '${uniTag}' AND facultyName = '${facultyName}' AND courseID = '${courseID}'`;
  // const university = await universities.findByPk(uniTag);
  //res.json(university);
  db.query(q, (err, result) => {
    try {
      res.json(result);
    } catch (err) {
      res.json(err);
    }
  });
});

router.post("/:uniTag/:facultyName/:courseID", async (req, res) => {
  // const listOfFaculties = await faculties.findAll();
  //res.json(listOfFaculties);
  const uniTag = req.params.uniTag;
  const facultyName = req.params.facultyName;
  const courseID = req.params.courseID;
  const q = `SELECT * FROM reviews WHERE universityTag = '${uniTag}' AND facultyName = '${facultyName}' AND courseID = '${courseID}'`;
  // const university = await universities.findByPk(uniTag);
  //res.json(university);
  db.query(q, (err, result) => {
    try {
      res.json(result);
    } catch (err) {
      res.json(err);
    }
  });
});

router.post(
  "/post/:uniTag/:facultyName/:courseID",
  validateToken,
  async (req, res) => {
    // const listOfFaculties = await faculties.findAll();
    //res.json(listOfFaculties);
    const post = req.body;

    let username = req.user.username;
    const uniTag = req.params.universityTag;
    const facultyName = req.params.faculty;
    const courseID = req.params.courseID;
    if (typeof username === "undefined") {
      const q = `INSERT INTO reviews (dateUploaded, universityTag, facultyName, courseID, overallScore, easyScore, useScore, interestScore, delivery, evaluation, termTaken, yearTaken, grade, textbook, workload, body, professorName) 
                                        VALUES (CURDATE(), '${post.universityTag}', '${post.faculty}', '${post.courseID}', '${post.overall}', '${post.easy}', '${post.useful}', '${post.interest}', '${post.delivery}', '${post.evaluation}', '${post.term}', '${post.year}', '${post.grade}', '${post.textbook}', '${post.work}', '${post.body}', '${post.professor}')`;

      await db.query(q, (err, result) => {
        try {
          res.json(result);
        } catch (err) {
          res.json(err);
        }
      });
    } else {
      const q2 = `INSERT INTO reviews (username, dateUploaded, universityTag, facultyName, courseID, overallScore, easyScore, useScore, interestScore, delivery, evaluation, termTaken, yearTaken, grade, textbook, workload, body, professorName) 
                                        VALUES ('${username}', CURDATE(), '${post.universityTag}', '${post.faculty}', '${post.courseID}', '${post.overall}', '${post.easy}', '${post.useful}', '${post.interest}', '${post.delivery}', '${post.evaluation}', '${post.term}', '${post.year}', '${post.grade}', '${post.textbook}', '${post.work}', '${post.body}', '${post.professor}')`;

      //res.json(university);
      await db.query(q2, (err2, result2) => {
        try {
          res.json(result2);
        } catch (err2) {
          res.json(err2);
        }
      });
    }
  }
);

export default router;
