import React, { useEffect, useState } from "react";
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
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function NewReview(props) {
  let { universityTag, facultyName, courseID } = useParams();
  const state = useLocation().state;
  const [show, setShow] = useState(false);
  const [easy, setEasy] = React.useState("");
  const [overall, setOverall] = React.useState("");
  const [useful, setUseful] = React.useState("");
  const [interest, setInterest] = React.useState("");
  const [body, setBody] = React.useState("");
  const [term, setTerm] = useState("");
  const [delivery, setDelivery] = React.useState("");
  const [grade, setGrade] = React.useState("");
  const [textbook, setTextbook] = React.useState("");
  const [evaluation, setEvaluation] = React.useState("");
  const [work, setWork] = React.useState("");
  const [year, setYear] = React.useState();
  const [professor, setProfessor] = React.useState("");

  const list = props.listOfProfessors;
  const username = props.username;

  const onSubmit = () => {
    let data = {
      overall,
      easy,
      useful,
      interest,
      delivery,
      evaluation,
      term,
      year,
      grade,
      textbook,
      work,
      body,
      professor,
      username,
    };

    if (data.overall !== "") {
      try {
        axios.post(
          `http://localhost:3001/review/post/${universityTag}/${facultyName}/${courseID}`,
          data,
          {
            headers: {
              accessToken: sessionStorage.getItem("accessToken"),
            },
          }
        );
        window.location.reload(true);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const enabled =
    overall >= 0 &&
    easy >= 0 &&
    useful >= 0 &&
    interest >= 0 &&
    term.length > 0 &&
    year > 0 &&
    body.length > 0 &&
    professor.length > 0 &&
    delivery.length > 0;

  return (
    <div className="course">
      <form>
        <Box sx={{ flexGrow: 1, flexWrap: "wrap" }} className="grid">
          <Grid container spacing={2} columns={{ xs: 8, md: 8, lg: 16 }}>
            <Grid item xs={8} md={8} lg={2}>
              <Card>
                <CardContent>
                  <Grid container spacing={3} columns={{ xs: 8, md: 8, lg: 1 }}>
                    <Grid item xs={4} md={4} lg={1}>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Overall
                      </Typography>
                      <FormControl sx={{ minWidth: 100 }}>
                        <InputLabel id="demo-simple-select-label">
                          Overall
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="overall"
                          value={overall}
                          label="Age"
                          onChange={(e) => setOverall(e.target.value)}
                          defaultValue=""
                          required={true}
                        >
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                          <MenuItem value={3}>3</MenuItem>
                          <MenuItem value={4}>4</MenuItem>
                          <MenuItem value={5}>5</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4} md={4} lg={1}>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Easy
                      </Typography>
                      <FormControl sx={{ minWidth: 100 }}>
                        <InputLabel id="demo-simple-select-label">
                          Easy
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={easy}
                          label="Age"
                          onChange={(e) => setEasy(e.target.value)}
                          defaultValue=""
                        >
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                          <MenuItem value={3}>3</MenuItem>
                          <MenuItem value={4}>4</MenuItem>
                          <MenuItem value={5}>5</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4} md={4} lg={1}>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Useful
                      </Typography>
                      <FormControl sx={{ minWidth: 100 }}>
                        <InputLabel id="demo-simple-select-label">
                          Useful
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={useful}
                          label="Age"
                          onChange={(e) => setUseful(e.target.value)}
                          defaultValue=""
                        >
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                          <MenuItem value={3}>3</MenuItem>
                          <MenuItem value={4}>4</MenuItem>
                          <MenuItem value={5}>5</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4} md={4} lg={1}>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Interest
                      </Typography>
                      <FormControl sx={{ minWidth: 100 }}>
                        <InputLabel id="demo-simple-select-label">
                          Interest
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={interest}
                          label="Age"
                          onChange={(e) => setInterest(e.target.value)}
                          defaultValue=""
                        >
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                          <MenuItem value={3}>3</MenuItem>
                          <MenuItem value={4}>4</MenuItem>
                          <MenuItem value={5}>5</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={14} md={8} lg={14}>
              <Card>
                <CardContent>
                  <Grid
                    container
                    spacing={2}
                    columns={{ xs: 8, md: 8, lg: 15 }}
                  >
                    <Grid item xs={8} md={8} lg={7}>
                      <Autocomplete
                        disablePortal
                        className="bar"
                        id="combo-box-demo"
                        getOptionLabel={(list) => `${list.professorName}`}
                        options={list}
                        onChange={(event: AnalyserNode, option: any) => {
                          setProfessor(option.professorName);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} label="Professor" />
                        )}
                      />
                      <p className="caption">
                        <small>Can't find your professor? Add it</small>
                      </p>
                    </Grid>
                    <Grid item xs={4} md={4} lg={4}>
                      <FormControl sx={{ minWidth: 100 }} fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Term
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={term}
                          label="Age"
                          onChange={(e) => setTerm(e.target.value)}
                          defaultValue=""
                        >
                          <MenuItem value="Fall">Fall</MenuItem>
                          <MenuItem value="Winter">Winter</MenuItem>
                          <MenuItem value="Spring">Spring</MenuItem>
                          <MenuItem value="Summer">Summer</MenuItem>
                          <MenuItem value="Year">Year</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4} md={4} lg={4}>
                      <FormControl sx={{ minWidth: 100 }} fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Year
                        </InputLabel>

                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={year}
                          label="Age"
                          onChange={(e) => setYear(e.target.value)}
                          defaultValue=""
                        >
                          {(() => {
                            const list = [];
                            const post = [];
                            for (let i = 0; i < 13; i++) {
                              list[i] = new Date().getFullYear() - i;
                              post.push(
                                <MenuItem value={list[i]}>{list[i]}</MenuItem>
                              );
                            }

                            return post;
                          })()}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={8} md={8} lg={5}>
                      <FormControl sx={{ minWidth: 100 }} fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Delivery Method
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={delivery}
                          label="Age"
                          onChange={(e) => setDelivery(e.target.value)}
                          defaultValue=""
                        >
                          <MenuItem value="In-Person">In-Person</MenuItem>
                          <MenuItem value="Online">Online</MenuItem>
                          <MenuItem value="Hybrid">Hybrid</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4} md={4} lg={5}>
                      <FormControl sx={{ minWidth: 100 }} fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Grade
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={grade}
                          label="Age"
                          onChange={(e) => setGrade(e.target.value)}
                          defaultValue=""
                        >
                          <MenuItem value="A+">A+</MenuItem>
                          <MenuItem value="A">A</MenuItem>
                          <MenuItem value="A">A-</MenuItem>
                          <MenuItem value="B+">B+</MenuItem>
                          <MenuItem value="B">B</MenuItem>
                          <MenuItem value="B-">B-</MenuItem>
                          <MenuItem value="C+">C+</MenuItem>
                          <MenuItem value="C">C</MenuItem>
                          <MenuItem value="C-">C-</MenuItem>
                          <MenuItem value="D+">D+</MenuItem>
                          <MenuItem value="D">D</MenuItem>
                          <MenuItem value="D-">D-</MenuItem>
                          <MenuItem value="F">F</MenuItem>
                          <MenuItem value="Dropped/Withrawal">
                            Dropped/Withdrawal
                          </MenuItem>
                          <MenuItem value="Incomplete">Incomplete</MenuItem>
                          <MenuItem value="Not sure yet">Not sure yet</MenuItem>
                          <MenuItem value="Rather not say">
                            Rather not say
                          </MenuItem>
                          <MenuItem value="Audit/No grade">
                            Audit/No grade
                          </MenuItem>
                          <MenuItem value="Pass">Pass</MenuItem>
                          <MenuItem value="Fail">Fail</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={4} md={4} lg={5}>
                      <FormControl sx={{ minWidth: 100 }} fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Textbook Use
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={textbook}
                          label="Age"
                          onChange={(e) => setTextbook(e.target.value)}
                          defaultValue=""
                        >
                          <MenuItem value="Yes">Yes</MenuItem>
                          <MenuItem value="No">No</MenuItem>
                          <MenuItem value="Optional">Optional</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={8} md={8} lg={10}>
                      <FormControl sx={{ minWidth: 100 }} fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Evaluation Methods
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={evaluation}
                          label="Age"
                          onChange={(e) => setEvaluation(e.target.value)}
                          defaultValue=""
                        >
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                          <MenuItem value={3}>3</MenuItem>
                          <MenuItem value={4}>4</MenuItem>
                          <MenuItem value={5}>5</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={8} md={8} lg={5}>
                      <FormControl sx={{ minWidth: 100 }} fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Workload
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={work}
                          label="Age"
                          onChange={(e) => setWork(e.target.value)}
                          defaultValue=""
                        >
                          <MenuItem value="Very Light">Very Light</MenuItem>
                          <MenuItem value="Light">Light</MenuItem>
                          <MenuItem value="Moderate">Moderate</MenuItem>
                          <MenuItem value="Heavy">Heavy</MenuItem>
                          <MenuItem value="Very Heavy">Very Heavy</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={8} md={8} lg={15}>
                      <p className="new_review_text">Body</p>

                      <TextField
                        className="bar"
                        id="outlined-basic"
                        label="Professor"
                        variant="outlined"
                        value={body}
                        multiline
                        rows={4}
                        onSubmit={(e) => {
                          e.preventDefault();
                        }}
                        onInput={(e) => setBody(e.target.value)}
                        sx={{ minWidth: 100 }}
                        fullWidth
                        required
                      />
                      <Button
                        variant="contained"
                        type="button"
                        disabled={!enabled}
                        sx={{ m: 1 }}
                        onClick={onSubmit}
                      >
                        Submit
                      </Button>
                    </Grid>

                    <Grid
                      container
                      direction="column"
                      alignItems="flex-end"
                      justify="flex-end"
                    ></Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </form>
    </div>
  );
}

export default NewReview;
