import express from 'express';
const router = express.Router();
import { db } from '../db.js';
import bcrypt from 'bcrypt';
import  jwt  from 'jsonwebtoken';
import validateToken  from '../middlewares/AuthMiddleware.js';


router.post('/register', async (req, res) => {
    // const listOfFaculties = await faculties.findAll();
     //res.json(listOfFaculties);
     const post = req.body;
    
    await bcrypt.hash(post.password, 10).then((hash) => {
        const q = `INSERT INTO course_review.userAccounts (username, pass, regDate) VALUES ('${post.username}', '${hash}', CURDATE())`;
        let check = 0;
        const q1 = `SELECT COUNT(*) as f from course_review.userAccounts WHERE username = '${post.username}'`;

        db.query(q1, (err, result) => {
        check = result[0].f;
        //console.log(check);

        if (check == 0) {
            db.query(q, (err, result) => {
                res.json("LOGGED IN");
             });
        } else if (check > 0) {
            res.json({error: "USERNAME ALREADY EXISTS"});
        }


        });

        
        
    })


});
    
    router.post('/login', async (req, res) => {
        // const listOfFaculties = await faculties.findAll();
         //res.json(listOfFaculties);
         const post = req.body;
        
        
            const q = `SELECT COUNT(*) as f, username, pass from course_review.userAccounts WHERE username = '${post.username}'`;
            let check = 0;
            const q1 = `SELECT (username, password) from course_review.userAccounts WHERE username = '${post.username}' & password = '${post.password}'`;
    
            db.query(q, (err, result) => {
            console.log(result);
            check = result[0].f;
            console.log(check);
    
            if (check == 0) {
                res.json({error: "Username doesn't exist!"});
                
            } else {
                bcrypt.compare(post.password, result[0].pass).then((match) => {
              
                    if (!match) {
                        res.json({error: "Wrong Username and Password Combination"});
                    } else {
                        const accessToken = jwt.sign(
                            { username: result[0].username },
                            "importantsecret"
                          );
                          res.json(accessToken);
                    }
    
                });
            }

            

            
    
    
            });
    
            
            
       
        
         //res.json(university);
         
     });


     router.get("/auth", validateToken, (req, res) => {
        console.log(req.user)
        if (req.user) {
            res.json(req.user);
        } else {
            res.json("");
        }

     });
     
 


export default router;