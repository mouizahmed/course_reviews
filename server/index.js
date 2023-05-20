import express from "express";
const app = express();
import cors from "cors";
import bodyParser from "body-parser";

app.use(express.json());
app.use(cors({
  origin: ["https://course-reviews-phi.vercel.app", "http://localhost:3000"],
  credentials: true,
  optionSuccessStatus: 200,
}));
app.use(bodyParser.json());

//const db = require('./models');

app.get('/health', (_, res) => res.send('Testing health status'))

// Routers
import universityRouter from "./routes/university.js";
app.use("/university", universityRouter);

import facultyRouter from "./routes/faculty.js";
app.use("/faculty", facultyRouter);

import courseRouter from "./routes/course.js";
app.use("/course", courseRouter);

import professorRouter from "./routes/professor.js";
app.use("/professor", professorRouter);

import reviewRouter from "./routes/review.js";
app.use("/review", reviewRouter);

import userRouter from "./routes/user.js";
app.use("/user", userRouter);

//db.sequelize.sync().then(()=> {
app.listen(3001, () => {
  console.log("Server running on port 3001");
});
//});
