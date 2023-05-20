import mysql from "mysql2";
import * as dotenv from 'dotenv'


const config = dotenv.config().parsed;

// export const db = mysql.createConnection({
//     host: config.HOST,
//     user: config.USER,
//     password: config.PASSWORD,
//     database: config.DATABASE,
//     ssl: config.ssl,
//     multipleStatements: true
// });

export const db = mysql.createConnection(process.env.DATABASE_URL);

db.connect((err) => {
    if (err) {
        console.log(err);
       // console.log(process.env.USER);
    } else {
        console.log("GFDFG");
    }
})

