import express from 'express';
const router = express.Router();
import { db } from '../db.js';


router.post('/add-professor', async(req, res) => {
    const post = req.body.formData;
    
    const q = `INSERT INTO course_review.professors(universityTag, facultyName, professorName) VALUES ('${post.universityTag}', '${post.faculty}', '${post.professor}');`
    console.log("PROFESSOR")
    db.query(q, (err, result) => {
        try {
        res.json(result);
        } catch (err) {
            res.json(err);
        }
    });
});

router.post('/list-professor-course', async(req, res) => {
    const post = req.body.formData;
    
    const q = `INSERT INTO course_review.professors_courses(professorName, universityTag, facultyName, courseID) VALUES ('${post.professor}', '${post.universityTag}', '${post.faculty}', '${post.courseID}');`

    db.query(q, (err, result) => {
        try {
            res.json(result);
        } catch (err) {
            res.json(err);
        }
    });
});


export default router;