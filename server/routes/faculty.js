import express from 'express';
const router = express.Router();
import { db } from '../db.js';
//const { faculties } = require('../models');


router.get('/', async (req, res) => {
   // const listOfFaculties = await faculties.findAll();
    //res.json(listOfFaculties);
    const q = "SELECT * FROM course_review.faculties"
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

router.get('/:uniTag', async (req, res) => {
    const uniTag = req.params.uniTag;
    //const faculty = await faculties.findAll({ where: { universityTag: uniTag }});
    //res.json(faculty);
    const q = `SELECT * FROM course_review.faculties WHERE universityTag = '${uniTag}'`
   // const university = await universities.findByPk(uniTag);
    //res.json(university);
    db.query(q, (err, result) => {
        try {
            res.json(result);
        } catch (err) {
            res.json(err);
        }
    });
    
})

router.get('/:uniTag/:facultyName', async (req, res) => {
    const uniTag = req.params.uniTag;
    const facultyName = req.params.facultyName;
    //const faculty = await faculties.findAll({ where: { universityTag: uniTag }});
    //res.json(faculty);
    const q = `SELECT professorName FROM course_review.professors WHERE universityTag = '${uniTag}' AND facultyName = '${facultyName}'`
   // const university = await universities.findByPk(uniTag);
    //res.json(university);
    db.query(q, (err, result) => {
        try {
            res.json(result);
        } catch (err) {
            res.json(err);
        }
    });
    
})

router.post('/add-faculty', async(req, res) => {
    ///console.log(req.body);
    const post = req.body.formData;
    //console.log(post);
    console.log("HI FACULTY")
    const q = `INSERT INTO course_review.faculties(facultyName, universityTag) VALUES ('${post.faculty}', '${post.universityTag}')`

    db.query(q, (err, result) => {
        //console.log(err);
        try {
            res.json(result);
        } catch (err) {
            res.json(err);
        }
    })


});


export default router;