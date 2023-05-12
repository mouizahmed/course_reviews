import React, { useState, useEffect, useRef } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

function Confirmation({
  formData,
  setFormData,
  type,
  selectedFile,
  page,
  setPage,
}) {
  const [imgURL, setImgURL] = useState("");
  const didMount = useRef(true);

  useEffect(() => {
    if (didMount.current) {
      didMount.current = false;
    } else {
      if (type === "add-university") {
        addU();
        console.log(formData.universityName);
        async function addU() {
          const firstR = await axios.post(
            `${process.env.REACT_APP_URL}/university/add`,
            { formData }
          );
          const secondR = await axios.post(
            `${process.env.REACT_APP_URL}/faculty/add-faculty`,
            { formData }
          );
          const thirdR = await axios.post(
            `${process.env.REACT_APP_URL}/course/add-course`,
            { formData }
          );
          const fourthR = await axios.post(
            `${process.env.REACT_APP_URL}/professor/add-professor`,
            { formData }
          );
          const fifthR = await axios.post(
            `${process.env.REACT_APP_URL}/professor/list-professor-course`,
            { formData }
          );
          const sixthR = await axios.post(
            `${process.env.REACT_APP_URL}/review/post/${formData.universityTag}/${formData.faculty}/${formData.courseID}`,
            formData,
            {
              headers: {
                accessToken: sessionStorage.getItem("accessToken"),
              },
            }
          );
          await window.location.replace(
            `/${formData.universityTag}/${formData.faculty}/${formData.courseID}`
          );
          //  window.location.reload(true);
        }
      }
    }
  }, [formData]);

  const onSubmit = async () => {
    // let data = { overall, easy, useful, interest, delivery, evaluation, term, year, grade, textbook, work, body, professor, username }

    if (type === "add-review") {
      const addP = await axios.post(
        `${process.env.REACT_APP_URL}/professor/add-professor`,
        { formData }
      );
      const addPC = await axios.post(
        `${process.env.REACT_APP_URL}/professor/list-professor-course`,
        { formData }
      );
      const addR = await axios.post(
        `${process.env.REACT_APP_URL}/review/post/${formData.universityTag}/${formData.faculty}/${formData.courseID}`,
        formData,
        {
          headers: {
            accessToken: sessionStorage.getItem("accessToken"),
          },
        }
      );
      window.location.reload(true);
    } else if (type === "add-course") {
      const secondR = await axios.post(
        `${process.env.REACT_APP_URL}/faculty/add-faculty`,
        { formData }
      );
      const addC = await axios.post(`${process.env.REACT_APP_URL}/course/add-course`, {
        formData,
      });
      const addP = await axios.post(
        `${process.env.REACT_APP_URL}/professor/add-professor`,
        { formData }
      );
      const addPC = await axios.post(
        `${process.env.REACT_APP_URL}/professor/list-professor-course`,
        { formData }
      );
      const addR = await axios.post(
        `${process.env.REACT_APP_URL}/review/post/${formData.universityTag}/${formData.faculty}/${formData.courseID}`,
        formData,
        {
          headers: {
            accessToken: sessionStorage.getItem("accessToken"),
          },
        }
      );

      window.location.replace(
        `/${formData.universityTag}/${formData.faculty}/${formData.courseID}`
      );
      //  window.location.reload(true);
    } else if (type === "add-university") {
      const url = process.env.REACT_APP_CLOUDINARY;

      selectedFile.forEach(async (acceptedFile) => {
        const image = new FormData();
        image.append("file", acceptedFile);
        image.append("upload_preset", "shxqog9u");

        const response = await fetch(url, {
          method: "post",
          body: image,
        });
        const data = await response.json();
        setFormData({ ...formData, logo: data.url });
      });
    }
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
    <div>
      Confirmation
      <div className="review">
        <Box sx={{ flexGrow: 1, flexWrap: "wrap" }} className="user-posts">
          <Card
            sx={{ flexGrow: 1, flexWrap: "wrap", margin: 0 }}
            className="card"
          >
            <CardContent>
              <Grid container spacing={0.5} columns={{ xs: 8, md: 8, lg: 16 }}>
                <Grid item lg={16}>
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: 15, textAlign: "left" }}
                  >
                    {formData.courseID} - {formData.professor} /{" "}
                    {formData.universityTag}
                  </Typography>
                </Grid>

                <Grid
                  container
                  spacing={2}
                  columns={{ xs: 8, md: 8, lg: 16 }}
                  alignItems="center"
                  textAlign="center"
                >
                  <Grid item xs={2} md={2} lg={4}>
                    <div className={checkColor(formData.overall)}>
                      {formData.overall}
                    </div>
                    <div>Overall</div>
                  </Grid>
                  <Grid item xs={2} md={2} lg={4}>
                    <div className={checkColor(formData.easy)}>
                      {formData.easy}
                    </div>
                    <div>Easiness</div>
                  </Grid>
                  <Grid item xs={2} md={2} lg={4}>
                    <div className={checkColor(formData.useful)}>
                      {formData.useful}
                    </div>
                    <div>Usefulness</div>
                  </Grid>
                  <Grid item xs={2} md={2} lg={4}>
                    <div className={checkColor(formData.interest)}>
                      {" "}
                      {formData.interest}
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
                    <Chip size="small" label={`Year: ${formData.yearTaken}`} />
                    <Chip size="small" label={`Term: ${formData.termTaken}`} />
                    <Chip
                      size="small"
                      label={`Delivery: ${formData.delivery}`}
                    />
                    <Chip
                      size="small"
                      label={`Workload: ${formData.workload}`}
                    />
                    <Chip
                      size="small"
                      label={`Textbook: ${formData.textbook}`}
                    />
                    <Chip
                      size="small"
                      label={`Evaluation: ${formData.evaluation}`}
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
                      {formData.body}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={2} columns={{ xs: 8, md: 8, lg: 16 }}>
                  <Grid item lg={8}>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: 15,
                        textAlign: "left",
                      }}
                    >
                      Grade: {formData.grade}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </div>
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
            onClick={onSubmit}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Confirmation;
