import mysql from "mysql";
import * as dotenv from 'dotenv'


const config = dotenv.config().parsed;

export const db = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
    multipleStatements: true
});

db.connect((err) => {
    if (err) {
        console.log(err);
       // console.log(process.env.USER);
    } else {
        console.log("GFDFG");
    }
})

