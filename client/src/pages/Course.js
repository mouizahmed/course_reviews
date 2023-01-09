import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import NewReview from "../components/NewReview.js";
import { format } from "date-fns";
import Moment from "react-moment";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import UserForm from "../components/UserForm";
import Chip from "@mui/material/Chip";
import CloseIcon from "@mui/icons-material/Close";

function Course({ authState, username }) {
  let { universityTag, facultyName, courseID } = useParams();

  //    const [listOfFaculties, setListOfFaculties] = useState([]);
  //    const [listOfCourses, setListOfCourses] = useState([]);

  const [course, setCourse] = useState([]);
  const [universityName, setUniversityName] = useState("");
  const [listOfReviews, setListOfReviews] = useState([]);

  const [listOfProfessors, setListOfProfessors] = useState([]);
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const handleOpen = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setPage(0);
  };

  useEffect(() => {
    axios
      .get(
        `https://course-reviews.onrender.com/course/${universityTag}/${facultyName}/${courseID}`
      )
      .then((response) => {
        setCourse(response.data[0]);

        setUniversityName(response.data[0].universityName);
      });
    axios
      .get(
        `https://course-reviews.onrender.com/review/${universityTag}/${facultyName}/${courseID}`
      )
      .then((response) => {
        setListOfReviews(response.data);
      });
    axios
      .get(
        `https://course-reviews.onrender.com/course/${universityTag}/${facultyName}/${courseID}/professors`
      )
      .then((response) => {
        setListOfProfessors(response.data);
      });
  }, [universityTag, facultyName, courseID]);

  const formatDate = (date) => {
    const newDate1 = Moment(date).format("YYYY-MM-DD");
    return newDate1;
  };

  const onDelete = (e, reviewID) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(reviewID);
    console.log("delete");
    axios
      .delete(`https://course-reviews.onrender.com/user/delete/${reviewID}`, {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setListOfReviews(
          listOfReviews.filter((val) => {
            return val.reviewID !== reviewID;
          })
        );
      });
  };

  const checkColor = (color) => {
    if (color <= 2) {
      return "red";
    } else if (color > 2 && color < 4) {
      return "yellow";
    } else {
      return "green";
    }
  };
  return (
    <div className="outer">
      <div className="home-top">
        <Card>
          <CardContent
            sx={{
              flexDirection: "column",
              alignContent: "center",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Typography
                sx={{ fontWeight: "bold", fontSize: 15, mt: 1.5 }}
                color="text.secondary"
              >
                {course.courseID}
              </Typography>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 15, mb: 1.5 }}
                color="text.secondary"
              >
                {course.courseName}
              </Typography>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
              >
                <br></br>
                <Button
                  variant="outlined"
                  onClick={() => setShow((prev) => !prev)}
                >
                  Leave a Review
                </Button>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </div>

      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper elevation={3}>
          <Box className="modal">
            <UserForm
              type={"add-review"}
              page={2}
              listOfUniversities={[{ universityName }]}
              uniTag={universityTag}
              professors={listOfProfessors}
              faculty={facultyName}
              courseID={courseID}
              courseName={course.courseName}
            />
          </Box>
        </Paper>
      </Modal>

      <div style={{ maxHeight: "75vh", overflow: "auto" }}>
        {listOfReviews.map((rows) => (
          <div className="review" key={rows.reviewID}>
            <Box sx={{ flexGrow: 1, flexWrap: "wrap" }} className="user-posts">
              <Card
                key={rows.reviewID}
                sx={{ flexGrow: 1, flexWrap: "wrap", margin: 0 }}
                className="card"
              >
                <CardContent>
                  <Grid
                    container
                    spacing={0.5}
                    columns={{ xs: 8, md: 8, lg: 16 }}
                  >
                    {authState && rows.username === username ? (
                      <>
                        <Grid item xs={7} md={7} lg={15}>
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              fontSize: 15,
                              textAlign: "left",
                            }}
                          >
                            {rows.courseID} - {rows.professorName} /{" "}
                            {rows.universityTag}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={1}
                          md={1}
                          lg={1}
                          sx={{ textAlign: "right" }}
                        >
                          <CloseIcon
                            className="delete"
                            onClick={(e) => {
                              onDelete(e, rows.reviewID);
                            }}
                          />
                        </Grid>
                      </>
                    ) : (
                      <>
                        <Grid item xs={8} md={8} lg={16}>
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              fontSize: 15,
                              textAlign: "left",
                            }}
                          >
                            {rows.courseID} - {rows.professorName} /{" "}
                            {rows.universityTag}
                          </Typography>
                        </Grid>
                      </>
                    )}

                    <Grid
                      container
                      spacing={2}
                      columns={{ xs: 8, md: 8, lg: 16 }}
                      alignItems="center"
                      textAlign="center"
                    >
                      <Grid item xs={2} md={2} lg={4}>
                        <div className={checkColor(rows.overall)}>
                          {rows.overallScore}
                        </div>
                        <div>Overall</div>
                      </Grid>
                      <Grid item xs={2} md={2} lg={4}>
                        <div className={checkColor(rows.easyScore)}>
                          {rows.easyScore}
                        </div>
                        <div>Easiness</div>
                      </Grid>
                      <Grid item xs={2} md={2} lg={4}>
                        <div className={checkColor(rows.UseScore)}>
                          {rows.UseScore}
                        </div>
                        <div>Usefulness</div>
                      </Grid>
                      <Grid item xs={2} md={2} lg={4}>
                        <div className={checkColor(rows.interestScore)}>
                          {" "}
                          {rows.interestScore}
                        </div>
                        <div>Interest</div>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      columns={{ xs: 8, md: 8, lg: 16 }}
                      alignItems="center"
                    >
                      <Grid item xs={8} lg={16} textAlign="left">
                        <Chip size="small" label={`Year: ${rows.yearTaken}`} />
                        <Chip size="small" label={`Term: ${rows.termTaken}`} />
                        <Chip
                          size="small"
                          label={`Delivery: ${rows.delivery}`}
                        />
                        <Chip
                          size="small"
                          label={`Workload: ${rows.workload}`}
                        />
                        <Chip
                          size="small"
                          label={`Textbook: ${rows.textbook}`}
                        />
                        <Chip
                          size="small"
                          label={`Evaluation: ${rows.evaluation}`}
                        />
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      columns={{ xs: 8, md: 8, lg: 16 }}
                      alignItems="left"
                    >
                      <Grid item lg={16}>
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            fontSize: 15,
                            textAlign: "left",
                          }}
                        >
                          Comments on the Course
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      columns={{ xs: 8, md: 8, lg: 16 }}
                      alignItems="left"
                    >
                      <Grid item lg={16}>
                        <Typography
                          sx={{
                            fontWeight: "regular",
                            fontSize: 15,
                            textAlign: "left",
                          }}
                        >
                          {rows.body}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      spacing={2}
                      columns={{ xs: 8, md: 8, lg: 16 }}
                    >
                      <Grid item lg={8}>
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            fontSize: 15,
                            textAlign: "left",
                          }}
                        >
                          Grade: {rows.grade}
                        </Typography>
                      </Grid>

                      <Grid item lg={8}>
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            fontSize: 15,
                            textAlign: "right",
                          }}
                        >
                          {rows.dateUploaded.slice(0, 10)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Course;
