import express from 'express';
const router = express.Router();
import { db } from '../db.js';
//const { faculties } = require('../models');


router.get('/', async (req, res) => {
   // const listOfFaculties = await faculties.findAll();
    //res.json(listOfFaculties);
    const q = "SELECT * FROM course_review.courses"
   // const university = await universities.findByPk(uniTag);
    //res.json(university);
    db.query(q, (err, result) => {
        res.json(result);
    });
});

router.get('/:uniTag/', async (req, res) => {
    const uniTag = req.params.uniTag;
    //const faculty = await faculties.findAll({ where: { universityTag: uniTag }});
    //res.json(faculty);
    //const q = `SELECT * FROM course_review.courses WHERE universityTag = '${uniTag}'`
    const q = `SELECT c.courseID, c.facultyName, c.universityTag, c.courseName, FORMAT(IFNULL(AVG(r.overallScore), 0), 0) 'overall', FORMAT(IFNULL(AVG(r.easyScore), 0), 0) 'easy', FORMAT(IFNULL(AVG(r.useScore), 0), 0) 'use', FORMAT(IFNULL(AVG(r.interestScore), 0), 0) 'interest', count(r.courseID) 'count' 
    FROM courses as c
    LEFT JOIN reviews as r
    ON c.courseID = r.courseID
    WHERE c.universityTag = '${uniTag}'
    GROUP BY c.courseID`
   // const university = await universities.findByPk(uniTag);
    //res.json(university);
    db.query(q, (err, result) => {
        res.json(result);
    });
    
})

router.get('/:uniTag/:facultyName', async (req, res) => {
    const uniTag = req.params.uniTag;
    const facultyName = req.params.facultyName;
    //const faculty = await faculties.findAll({ where: { universityTag: uniTag }});
    //res.json(faculty);
    const q = `SELECT * FROM course_review.courses WHERE universityTag = '${uniTag}' AND facultyName = '${facultyName}'`
   // const university = await universities.findByPk(uniTag);
    //res.json(university);
    db.query(q, (err, result) => {
        res.json(result)
    });
    
})


router.get('/:uniTag/:facultyName/:courseID', async (req, res) => {
    const uniTag = req.params.uniTag;
    const facultyName = req.params.facultyName;
    const courseID = req.params.courseID;
    //const faculty = await faculties.findAll({ where: { universityTag: uniTag }});
    //res.json(faculty);
    const q = `SELECT * FROM course_review.courses WHERE universityTag = '${uniTag}' AND facultyName = '${facultyName}' AND courseID = '${courseID}'`
   // const university = await universities.findByPk(uniTag);
    //res.json(university);
    db.query(q, (err, result) => {
        res.json(result)
    });
    
})

router.get('/:uniTag/:facultyName/:courseID/averageOverall', async (req, res) => {
    const uniTag = req.params.uniTag;
    const facultyName = req.params.facultyName;
    const courseID = req.params.courseID;
    //const faculty = await faculties.findAll({ where: { universityTag: uniTag }});
    //res.json(faculty);
    const q = `SELECT AVG(overallScore) 'overall' FROM course_review.reviews WHERE universityTag = '${uniTag}' AND facultyName = '${facultyName}' AND courseID = '${courseID}'`
   // const university = await universities.findByPk(uniTag);
    //res.json(university);
    db.query(q, (err, result) => {
        res.json(result)
    });
    
})

router.get('/:uniTag/:facultyName/:courseID/professors', async (req, res) => {
    const uniTag = req.params.uniTag;
    const facultyName = req.params.facultyName;
    const courseID = req.params.courseID;
    //const faculty = await faculties.findAll({ where: { universityTag: uniTag }});
    //res.json(faculty);
    const q = `SELECT * FROM course_review.professors_courses WHERE universityTag='${uniTag}' AND facultyName='${facultyName}' AND courseID='${courseID}'`
   // const university = await universities.findByPk(uniTag);
    //res.json(university);
    db.query(q, (err, result) => {
        res.json(result)
    });
    
})

router.post('/post', async (req, res) => {
    const uniTag = req.params.uniTag;
    const facultyName = req.params.facultyName;
    const courseID = req.params.courseID;
    //const faculty = await faculties.findAll({ where: { universityTag: uniTag }});
    //res.json(faculty);
    const q = `SELECT * FROM course_review.professors_courses WHERE universityTag='${uniTag}' AND facultyName='${facultyName}' AND courseID='${courseID}'`
   // const university = await universities.findByPk(uniTag);
    //res.json(university);
    // db.query(q, (err, result) => {
    //     res.json(result)
    // });
    console.log(req);
})

export default router;