import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

function Profile(props) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://course-reviews-backend.vercel.app/user/posts`, {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setPosts(response.data);
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="App"></div>;
  }

  const onDelete = (e, reviewID) => {
    e.preventDefault();
    e.stopPropagation();
    axios
      .delete(`https://course-reviews-backend.vercel.app/user/delete/${reviewID}`, {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setPosts(
          posts.filter((val) => {
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

  return props.authState ? (
    <>
      <div className="outer">
        <div className="profile">
          <Card>
            <CardContent>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 30, textAlign: "left" }}
              >
                {props.username.toUpperCase()}
              </Typography>
              <Typography
                sx={{ mb: 1.5, textAlign: "left" }}
                color="text.secondary"
              >
                {props.email}
              </Typography>
            </CardContent>
          </Card>

          <Typography
            sx={{ fontWeight: "bold", fontSize: 30, textAlign: "left" }}
          >
            My Posts
          </Typography>
        </div>

        <div style={{ maxHeight: "70vh", overflow: "auto" }}>
          {posts.map((rows, key) => (
            <div className="review" key={rows.reviewID}>
              <Link
                to={`/${rows.universityTag}/${rows.facultyName}/${rows.courseID}`}
                style={{ textDecoration: "none" }}
              >
                <Box
                  sx={{ flexGrow: 1, flexWrap: "wrap" }}
                  className="user-posts"
                >
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
                            <Chip
                              size="small"
                              label={`Year: ${rows.yearTaken}`}
                            />
                            <Chip
                              size="small"
                              label={`Term: ${rows.termTaken}`}
                            />
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
                          <Grid item xs={4} md={4} lg={8}>
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

                          <Grid item xs={4} md={4} lg={8}>
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
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  ) : (
    <div>Please log in or register to view your profile.</div>
  );
}

export default Profile;
