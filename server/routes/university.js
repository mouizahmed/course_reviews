import express from 'express';
const router = express.Router();
//const { universities } = require('../models');
import { db } from "../db.js";


router.get('/', async (req, res) => {
    const q = "SELECT universities.universityName, universities.universityTag, (SELECT COUNT(*) FROM reviews WHERE universities.universityTag=reviews.universityTag) as review_num, logo FROM universities GROUP BY universityName;";
    db.query(q, (err, result) => {

        res.json(result);
    });
    //const listOfUniversities = await universities.findAll();
    //res.json(listOfUniversities);
});


router.get('/byUniTag/:uniTag', async (req, res) => {
    const uniTag = req.params.uniTag;
    const q = `SELECT * FROM course_review.universities WHERE universityTag = '${uniTag}'`
   // const university = await universities.findByPk(uniTag);
    //res.json(university);
    db.query(q, (err, result) => {
        res.json(result);
    });
})


export default router;