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
        res.json(result);
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
        res.json(result);
    });
    
})


export default router;