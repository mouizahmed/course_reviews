import express, { application } from "express";
const router = express.Router();
import { db } from "../db.js";
import reviewRoute from "./review.js";

//const { faculties } = require('../models');

//const reviewRoute = require("./review");

router.get("/", async (req, res) => {
  // const listOfFaculties = await faculties.findAll();
  //res.json(listOfFaculties);
  const q = "SELECT * FROM courses";
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

router.get("/:uniTag/", async (req, res) => {
  const uniTag = req.params.uniTag;
  //const faculty = await faculties.findAll({ where: { universityTag: uniTag }});
  //res.json(faculty);
  //const q = `SELECT * FROM course_review.courses WHERE universityTag = '${uniTag}'`
  const q = `SELECT c.courseID, c.facultyName, c.universityTag, c.courseName, FORMAT(IFNULL(AVG(r.overallScore), 0), 0) 'overall', FORMAT(IFNULL(AVG(r.easyScore), 0), 0) 'easy', FORMAT(IFNULL(AVG(r.useScore), 0), 0) 'use', FORMAT(IFNULL(AVG(r.interestScore), 0), 0) 'interest', count(r.courseID) 'count' 
    FROM courses as c
    LEFT JOIN reviews as r
    ON c.courseID = r.courseID
    WHERE c.universityTag = '${uniTag}'
    GROUP BY c.courseID;`;
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

router.get("/:uniTag/:facultyName", async (req, res) => {
  const uniTag = req.params.uniTag;
  const facultyName = req.params.facultyName;
  //const faculty = await faculties.findAll({ where: { universityTag: uniTag }});
  //res.json(faculty);
  const q = `SELECT * FROM courses WHERE universityTag = '${uniTag}' AND facultyName = '${facultyName}'`;
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

router.get("/:uniTag/:facultyName/:courseID", async (req, res) => {
  const uniTag = req.params.uniTag;
  const facultyName = req.params.facultyName;
  const courseID = req.params.courseID;
  //const faculty = await faculties.findAll({ where: { universityTag: uniTag }});
  //res.json(faculty);
  const q = `SELECT courses.facultyName, courses.universityTag, courses.courseID, courses.courseName, universities.universityName FROM courses, universities WHERE courses.universityTag = '${uniTag}' AND courses.facultyName = '${facultyName}' AND courses.courseID = '${courseID}' AND universities.universityTag = '${uniTag}'`;
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

router.get(
  "/:uniTag/:facultyName/:courseID/averageOverall",
  async (req, res) => {
    const uniTag = req.params.uniTag;
    const facultyName = req.params.facultyName;
    const courseID = req.params.courseID;
    //const faculty = await faculties.findAll({ where: { universityTag: uniTag }});
    //res.json(faculty);
    const q = `SELECT AVG(overallScore) 'overall' FROM reviews WHERE universityTag = '${uniTag}' AND facultyName = '${facultyName}' AND courseID = '${courseID}'`;
    // const university = await universities.findByPk(uniTag);
    //res.json(university);
    db.query(q, (err, result) => {
      try {
        res.json(result);
      } catch (err) {
        res.json(err);
      }
    });
  }
);

router.get("/:uniTag/:facultyName/:courseID/professors", async (req, res) => {
  const uniTag = req.params.uniTag;
  const facultyName = req.params.facultyName;
  const courseID = req.params.courseID;
  //const faculty = await faculties.findAll({ where: { universityTag: uniTag }});
  //res.json(faculty);
  const q = `SELECT * FROM professors_courses WHERE universityTag='${uniTag}' AND facultyName='${facultyName}' AND courseID='${courseID}'`;
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

router.post("/add-course", async (req, res) => {
  const post = req.body.formData;
  const q = `INSERT INTO courses(facultyName, universityTag, courseID, courseName) VALUES('${post.faculty}', '${post.universityTag}', '${post.courseID}', '${post.courseName}')`;

  db.query(q, (err, result) => {
    try {
      res.json(result);
    } catch (err) {
      res.json(err);
    }
  });
});

export default router;
