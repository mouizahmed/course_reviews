import express from "express";
const router = express.Router();
//const { universities } = require('../models');
import { db } from "../db.js";

router.get("/", async (req, res) => {
  const q =
    "SELECT universities.universityName, universities.universityTag, (SELECT COUNT(*) FROM reviews WHERE universities.universityTag=reviews.universityTag) as review_num, logo FROM universities GROUP BY universityName;";
  db.query(q, (err, result) => {
    try {
      res.json(result);
    } catch (err) {
      res.json(err);
    }
  });
  //const listOfUniversities = await universities.findAll();
  //res.json(listOfUniversities);
});

router.get("/byUniTag/:uniTag", async (req, res) => {
  const uniTag = req.params.uniTag;
  const q = `SELECT * FROM course_review.universities WHERE universityTag = '${uniTag}'`;
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

router.post("/add", async (req, res) => {
  ///console.log(req.body);
  const post = req.body.formData;
  //console.log(post);
  const q = `INSERT INTO course_review.universities (universityTag, universityName, logo) VALUES ('${post.universityTag}', '${post.universityName}', '${post.logo}');`;
  // const q = `INSERT INTO course_review.universities (universityTag, universityName, logo) VALUES ('${post.universityTag}', '${post.universityName}', '${post.logo}');
  //            INSERT INTO course_review.faculties (facultyName, universityTag) VALUES ('${post.faculty}', '${post.universityTag}');
  //            INSERT INTO course_review.courses (facultyName, universityTag, courseID, courseName) VALUES ('${post.faculty}', '${post.universityTag}', '${post.courseID}', '${post.courseName}');
  //            INSERT INTO course_review.professors (universityTag, facultyName, professorName) VALUES ('${post.universityTag}', '${post.faculty}', '${post.professor}');
  //            INSERT INTO course_review.professors_courses (professorName, universityTag, facultyName, courseID) VALUES ('${post.professor}', '${post.universityTag}', '${post.faculty}', '${post.courseID}');
  //            INSERT INTO course_review.reviews (dateUploaded, universityTag, facultyName, courseID, overallScore, easyScore, useScore, interestScore, delivery, evaluation, termTaken, yearTaken, grade, textbook, workload, body, professorName)
  //                           VALUES (CURDATE(), '${post.universityTag}', '${post.faculty}', '${post.courseID}', '${post.overall}', '${post.easy}', '${post.useful}', '${post.interest}', '${post.delivery}', '${post.evaluation}', '${post.term}', '${post.year}', '${post.grade}', '${post.textbook}', '${post.work}', '${post.body}', '${post.professor}')`
  db.query(q, (err, result) => {
    try {
      res.json(result);
    } catch (err) {
      res.json(err);
    }
  });
});

export default router;
