import React, { useEffect, useState, useRef } from "react";
import "../App.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import Grid from "@mui/material/Grid";

function NewCourse({
  page,
  setPage,
  formData,
  setFormData,
  type,
  listOfFaculties,
}) {
  const [listOfProfessors, setListOfProfessors] = useState([]);
  const [check, setCheck] = useState(false);
  const didMount = useRef(true);

  useEffect(() => {
    if (didMount.current) {
      didMount.current = false;
    } else {
      axios
        .get(
          `${process.env.REACT_APP_URL}/faculty/${formData.universityTag}/${formData.faculty}`
        )
        .then((response) => {
          setListOfProfessors(response.data);
        });
    }
  }, [formData]);

  const enabled =
    formData.courseID.length > 0 &&
    formData.courseName.length > 0 &&
    formData.faculty.length > 0 &&
    formData.professor.length > 0;

  function disabled() {
    if (formData.faculty === "") {
      return true;
    } else {
      return false;
    }
  }

  const [addFaculty, setAddFaculty] = useState(false);
  const [addProfessor, setAddProfessor] = useState(false);

  return (
    <div className="">
      <h1>Add a course to {formData.universityName}</h1>
      <Box sx={{ width: "100%" }}>
        <TextField
          className="bar"
          label="Course Name"
          variant="outlined"
          margin="normal"
          value={formData.courseName}
          onSubmit={(e) => {
            e.preventDefault();
          }}
          onInput={(e) =>
            setFormData({ ...formData, courseName: e.target.value })
          }
          sx={{ minWidth: 100 }}
          fullWidth
          required
        />
        <TextField
          className="bar"
          label="Course ID"
          variant="outlined"
          margin="normal"
          value={formData.courseID}
          onSubmit={(e) => {
            e.preventDefault();
          }}
          onInput={(e) =>
            setFormData({
              ...formData,
              courseID: e.target.value.split(" ").join(""),
            })
          }
          sx={{ minWidth: 100 }}
          fullWidth
          required
        />

        {type === "add-course" ? (
          !addFaculty ? (
            <>
              <Autocomplete
                disablePortal
                className="bar"
                id="combo-box-demo"
                getOptionLabel={(listOfFaculties) =>
                  `${listOfFaculties.facultyName}`
                }
                options={listOfFaculties}
                defaultChecked={formData.faculty}
                noOptionsText={
                  <>
                    <div>
                      0 Results.{" "}
                      <a
                        className="link"
                        onClick={() => {
                          setAddFaculty(true);
                        }}
                      >
                        Add a Faculty
                      </a>{" "}
                      if it's not here.
                    </div>
                  </>
                }
                onChange={(event: AnalyserNode, option: any, reason) => {
                  setFormData(
                    reason === "clear"
                      ? { ...formData, faculty: "" }
                      : { ...formData, faculty: option.facultyName }
                  );
                  setCheck(true);
                }}
                onInput={(e) =>
                  setFormData({ ...formData, faculty: e.target.value })
                }
                renderInput={(params) => (
                  <TextField {...params} label="Faculties" />
                )}
              />
              {!addProfessor ? (
                <Autocomplete
                  disablePortal
                  disabled={disabled()}
                  className="bar"
                  id="combo-box-demo"
                  getOptionLabel={(listOfProfessors) =>
                    `${listOfProfessors.professorName}`
                  }
                  options={listOfProfessors}
                  onInput={(e) =>
                    setFormData({ ...formData, professor: e.target.value })
                  }
                  noOptionsText={
                    <>
                      <div>
                        0 Results.{" "}
                        <a
                          className="link"
                          onClick={() => setAddProfessor(true)}
                        >
                          Add a Professor to this faculty
                        </a>{" "}
                        if it's not here.
                      </div>
                    </>
                  }
                  isOptionEqualToValue={(option, value) =>
                    option.professorName === value.professorName
                  }
                  onChange={(event: AnalyserNode, option: any, reason) => {
                    setFormData(
                      reason === "clear"
                        ? { ...formData, professor: "" }
                        : { ...formData, professor: option.professorName }
                    );
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Professor" />
                  )}
                />
              ) : (
                <TextField
                  className="bar"
                  id="foutlined-basic"
                  label="Professor Name"
                  color="secondary"
                  focused
                  variant="outlined"
                  margin="normal"
                  value={formData.professor}
                  disabled={disabled()}
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                  onInput={(e) =>
                    setFormData({ ...formData, professor: e.target.value })
                  }
                  sx={{ minWidth: 100 }}
                  fullWidth
                  required
                />
              )}
            </>
          ) : (
            <>
              <TextField
                className="bar"
                color="secondary"
                focused
                label="Faculty Name"
                variant="outlined"
                margin="normal"
                value={formData.faculty}
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                onInput={(e) =>
                  setFormData({
                    ...formData,
                    faculty: e.target.value.split(" ").join(""),
                  })
                }
                sx={{ minWidth: 100 }}
                fullWidth
                required
              />

              <TextField
                className="bar"
                focused
                color="secondary"
                id="foutlined-basic"
                label="Professor Name"
                variant="outlined"
                margin="normal"
                value={formData.professor}
                disabled={disabled()}
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                onInput={(e) =>
                  setFormData({ ...formData, professor: e.target.value })
                }
                sx={{ minWidth: 100 }}
                fullWidth
                required
              />
            </>
          )
        ) : (
          <>
            <TextField
              className="bar"
              label="Faculty Name"
              variant="outlined"
              margin="normal"
              value={formData.faculty}
              onSubmit={(e) => {
                e.preventDefault();
              }}
              onInput={(e) =>
                setFormData({
                  ...formData,
                  faculty: e.target.value.split(" ").join(""),
                })
              }
              sx={{ minWidth: 100 }}
              fullWidth
              required
            />

            <TextField
              className="bar"
              id="foutlined-basic"
              label="Professor Name"
              variant="outlined"
              margin="normal"
              value={formData.professor}
              disabled={disabled()}
              onSubmit={(e) => {
                e.preventDefault();
              }}
              onInput={(e) =>
                setFormData({ ...formData, professor: e.target.value })
              }
              sx={{ minWidth: 100 }}
              fullWidth
              required
            />
          </>
        )}

        {type === "add-university" ? (
          <>
            <Grid container spacing={1} columns={{ xs: 10, lg: 10 }}>
              <Grid item xs={5} lg={5} sx={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  margin="normal"
                  type="submit"
                  sx={{ width: 100 }}
                  onClick={() => {
                    setPage(page - 1);
                  }}
                >
                  Previous
                </Button>
              </Grid>
              <Grid item xs={5} lg={5} sx={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  margin="normal"
                  type="submit"
                  sx={{ width: 100 }}
                  onClick={() => {
                    setPage(page + 1);
                  }}
                  disabled={!enabled}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Grid container spacing={1} columns={{ xs: 10, lg: 10 }}>
              <Grid item xs={5} lg={5} sx={{ textAlign: "center" }}></Grid>
              <Grid item xs={5} lg={5} sx={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  margin="normal"
                  type="submit"
                  sx={{ width: 100 }}
                  onClick={() => {
                    setPage(page + 1);
                  }}
                  disabled={!enabled}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </div>
  );
}

export default NewCourse;
