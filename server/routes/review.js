import express from 'express';
const router = express.Router();
import { db } from '../db.js';
import validateToken from '../middlewares/AuthMiddleware.js';
//const { faculties } = require('../models');


router.get('/:uniTag/:facultyName/:courseID', async (req, res) => {
   // const listOfFaculties = await faculties.findAll();
    //res.json(listOfFaculties);
    const uniTag = req.params.uniTag;
    const facultyName = req.params.facultyName;
    const courseID = req.params.courseID;
    const q = `SELECT * FROM course_review.reviews WHERE universityTag = '${uniTag}' AND facultyName = '${facultyName}' AND courseID = '${courseID}'`
   // const university = await universities.findByPk(uniTag);
    //res.json(university);
    db.query(q, (err, result) => {
        res.json(result);
    });
});

router.post('/:uniTag/:facultyName/:courseID', async (req, res) => {
    // const listOfFaculties = await faculties.findAll();
     //res.json(listOfFaculties);
     const uniTag = req.params.uniTag;
     const facultyName = req.params.facultyName;
     const courseID = req.params.courseID;
     const q = `SELECT * FROM course_review.reviews WHERE universityTag = '${uniTag}' AND facultyName = '${facultyName}' AND courseID = '${courseID}'`
    // const university = await universities.findByPk(uniTag);
     //res.json(university);
     db.query(q, (err, result) => {
         res.json(result);
     });
 });

 router.post('/post/:uniTag/:facultyName/:courseID', validateToken, async (req, res) => {
    // const listOfFaculties = await faculties.findAll();
     //res.json(listOfFaculties);
     const post = req.body;
     console.log(req.user);
     let username = req.user.username;
     const uniTag = req.params.uniTag;
     const facultyName = req.params.facultyName;
     const courseID = req.params.courseID;
     console.log("USER: " + username)
     if (typeof username === 'undefined') {
        console.log("NO USER")
        const q = `INSERT INTO course_review.reviews (dateUploaded, universityTag, facultyName, courseID, overallScore, easyScore, useScore, interestScore, delivery, evaluation, termTaken, yearTaken, grade, textbook, workload, body, professorName) 
                                        VALUES (CURDATE(), '${uniTag}', '${facultyName}', '${courseID}', '${post.overall}', '${post.easy}', '${post.useful}', '${post.interest}', '${post.delivery}', '${post.evaluation}', '${post.term}', '${post.year}', '${post.grade}', '${post.textbook}', '${post.work}', '${post.body}', '${post.professor}')`

                                        await db.query(q, (err, result) => {
                                            console.log(err);
                                           res.json(result);
                                        });
        
    } else {
    console.log(username.username);
    console.log("HAS USER")
     const q = `INSERT INTO course_review.reviews (username, dateUploaded, universityTag, facultyName, courseID, overallScore, easyScore, useScore, interestScore, delivery, evaluation, termTaken, yearTaken, grade, textbook, workload, body, professorName) 
                                        VALUES ('${username}', CURDATE(), '${uniTag}', '${facultyName}', '${courseID}', '${post.overall}', '${post.easy}', '${post.useful}', '${post.interest}', '${post.delivery}', '${post.evaluation}', '${post.term}', '${post.year}', '${post.grade}', '${post.textbook}', '${post.work}', '${post.body}', '${post.professor}')`
    
     //res.json(university);
     await db.query(q, (err, result) => {
         console.log(err);
        res.json(result);
     });
    }
 });



export default router;