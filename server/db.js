import mysql from "mysql";
import * as dotenv from 'dotenv'


const config = dotenv.config();
console.log(config);
export const db = mysql.createConnection({
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DATABASE,
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

