import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import UserForm from "../components/UserForm";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function University() {
  let { universityTag } = useParams();

  const [listOfFaculties, setListOfFaculties] = useState([]);
  const [listOfCourses, setListOfCourses] = useState([]);
  const [filtered, setFiltered] = useState(listOfCourses);
  const [searched, setSearched] = useState("");
  const [universityName, setUniversityName] = useState("");
  const [overallScore, setOverallScore] = useState(0.0);
  const [facultyNames, setFacultyNames] = useState("");
  const [courseIDs, setCourseIDs] = useState("");
  const [easyColor, setEasyColor] = useState("");

  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const handleOpen = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setPage(0);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/university/byUniTag/${universityTag}`)
      .then((response) => {
        setUniversityName(response.data[0].universityName);
      });
    axios
      .get(`${process.env.REACT_APP_URL}/faculty/${universityTag}`)
      .then((response) => {
        setListOfFaculties(response.data);
      });
    axios
      .get(`${process.env.REACT_APP_URL}/course/${universityTag}`)
      .then((response) => {
        setListOfCourses(response.data);
        setFiltered(response.data);
      });
    axios
      .get(`${process.env.REACT_APP_URL}/course/${universityTag}`)
      .then((response) => {
        setListOfCourses(response.data);
        setFiltered(response.data);
      });
  }, []);

  const handleChange = (e) => {
    e.preventDefault();

    setSearched(e.target.value);
    requestSearch(e.target.value);
  };

  const requestSearch = (searched) => {
    /* const filteredRows = listOfCourses.filter((row) => {
        return row.courseID.toLowerCase().includes(searched.toLowerCase());
      });
      
      setListOfCourses(filteredRows); */
    const filteredRows = listOfCourses.filter((row) => {
      return row.courseID.toLowerCase().includes(searched.toLowerCase());
    });
    setFiltered(filteredRows);
  };

  const checkColor = (color, count) => {
    if (count < 1) {
      return "grey";
    } else {
      if (color <= 2) {
        return "red";
      } else if (color > 2 && color < 4) {
        return "yellow";
      } else {
        return "green";
      }
    }
  };

  return (
    <div>
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
                sx={{ fontWeight: "bold", fontSize: 15, mb: 1.5, mt: 1.5 }}
                color="text.secondary"
              >
                {universityName} Reviews
              </Typography>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
              >
                <TextField
                  className="bar"
                  id="outlined-basic"
                  label="Course"
                  variant="outlined"
                  value={searched}
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                  onInput={(e) => handleChange(e)}
                />
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
              type={"add-course"}
              page={1}
              listOfUniversities={[{ universityName }]}
              uniTag={universityTag}
              professors={[]}
              listOfFaculties={listOfFaculties}
            />
          </Box>
        </Paper>
      </Modal>

      <div className="overflow">
        <div className="review">
          <div className="table">
            <Grid container spacing={2} sx={{ textAlign: "left" }}>
              <Grid item>
                <Button
                  variant="contained"
                  className="button_add"
                  onClick={() => setShow((prev) => !prev)}
                >
                  Add Course
                </Button>
              </Grid>
            </Grid>
            <TableContainer>
              <Table aria-label="courses">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Course ID</TableCell>
                    <TableCell align="center">Course Name</TableCell>
                    <TableCell align="center">Faculty Name</TableCell>
                    <TableCell align="center">Overall</TableCell>
                    <TableCell align="center">Easiness</TableCell>
                    <TableCell align="center">Interest</TableCell>
                    <TableCell align="center">Usefulness</TableCell>
                    <TableCell align="center">Reviews</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filtered.map((rows) => (
                    <TableRow
                      className="uni_table_row"
                      key={rows.courseID}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      hover
                      onClick={() =>
                        window.location.href = `/${rows.universityTag}/${rows.facultyName}/${rows.courseID}`
                      }
                      pointer={rows.toString()}
                    >
                      <TableCell component="th" scope="row" align="center">
                        {rows.courseID}
                      </TableCell>
                      <TableCell align="center">{rows.courseName}</TableCell>
                      <TableCell align="center">{rows.facultyName}</TableCell>
                      <TableCell align="center">
                        <div className={checkColor(rows.overall, rows.count)}>
                          {rows.overall}
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <div className={checkColor(rows.easy, rows.count)}>
                          {rows.easy}
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <div className={checkColor(rows.interest, rows.count)}>
                          {rows.interest}
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <div className={checkColor(rows.use, rows.count)}>
                          {rows.use}
                        </div>
                      </TableCell>
                      <TableCell align="center">{rows.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default University;
